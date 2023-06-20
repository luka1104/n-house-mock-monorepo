import Web3 from "web3"
import contract from "@/contracts/NhouseNFT.json"
import { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://evm.astar.network"
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || "0x872449c44937f6Ac266cbBCDCb189B25AcEBb9E9"
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || ""
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x83979FB1FD5664cB59784Aa86f1bBaaf5DdFf7c0"

const handleBatchMint = async (web3: any, tokenUris: any[], res: NextApiResponse) => {
  const nftContract = new web3.eth.Contract((contract as any).abi, CONTRACT_ADDRESS)
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")
  const data = await nftContract.methods.batchMintNFT(PUBLIC_KEY, tokenUris).encodeABI()
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
  const { dates } = req.body
  const web3 = new Web3(API_URL)

  let tokenUris: any[] = []
  dates.map((date: any) => {
    tokenUris.push({
      name: "Nhouse NFT",
      description: "An NFT from Nhouse",
      image: "https://art.pixilart.com/82d984fcd46cafb.gif",
      propertyName: "Nhouse Blue",
      reservedDate: date,
    })
  })

  const resp = await handleBatchMint(web3, tokenUris, res)

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
