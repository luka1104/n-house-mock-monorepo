import Web3 from "web3"
import contract from "@/contracts/NhouseMembership.json"
import { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://evm.astar.network"
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || "0x872449c44937f6Ac266cbBCDCb189B25AcEBb9E9"
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || ""
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_MEMBERSHIP_ADDRESS || "0x7B4a600b78fC6534B4125145cd38e45d366ebD28"

const handleMint = async (web3: any, address: string, tokenUri: any, res: NextApiResponse) => {
  const nftContract = new web3.eth.Contract((contract as any).abi, CONTRACT_ADDRESS)
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")
  const data = await nftContract.methods.mintNFT(PUBLIC_KEY, tokenUri).encodeABI()
  const tx = {
    gas: 5000000,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    data: data,
    from: PUBLIC_KEY,
  }
  const resp = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY, async (err: any, signedTx: any) => {
    if (err) {
      res.status(500).json({ error: err })
      return
    }
    console.log("SIGNING", signedTx)
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string, (err: any, resp: any) => {
      if (err) {
        res.status(500).json({ error: err })
        return
      }
      console.log("RESERVING", resp)
    })
  })
  return { status: 200, hash: resp.transactionHash }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.body
  const web3 = new Web3(API_URL)

  const tokenUri = JSON.stringify({
    name: "Nhouse Membership NFT",
    description: "An NFT from Nhouse",
    image: "https://art.pixilart.com/82d984fcd46cafb.gif",
    propertyName: "Nhouse Blue",
  })

  const resp = await handleMint(web3, address, tokenUri, res)

  if (resp.hash) {
    const interval = setInterval(function () {
      console.log("Attempting to get transaction receipt...")
      web3.eth.getTransactionReceipt(resp.hash, function (err, rec) {
        if (rec) {
          console.log(rec)
          clearInterval(interval)
          res.status(200).json({ receipt: rec })
        }
        if (err) {
          console.log(err)
          clearInterval(interval)
          res.status(500).json({ error: err })
        }
      })
    }, 1000)
  }
}
