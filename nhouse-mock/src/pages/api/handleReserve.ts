import Web3 from "web3"
import contract from "@/contracts/NhouseNFT.json"
import { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://evm.astar.network"
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || "0x872449c44937f6Ac266cbBCDCb189B25AcEBb9E9"
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || ""
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xeeF566179E2896aFE3bA1E456088e6fe670C4801"

const handleTransfer = async (web3: any, address: string, tokenId: string, res: NextApiResponse) => {
  const nftContract = new web3.eth.Contract((contract as any).abi, CONTRACT_ADDRESS)
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")
  const data = await nftContract.methods.transferFrom(PUBLIC_KEY, address, JSON.parse(tokenId)).encodeABI()
  const tx = {
    gas: 500000,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    data: data,
    from: address,
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
  const { address, tokenId } = req.body
  const web3 = new Web3(API_URL)
  const resp = await handleTransfer(web3, address, tokenId, res)
  console.log(resp)
  let intervalId: any
  if (resp.hash) {
    intervalId = setInterval(function () {
      console.log("Attempting to get transaction receipt...")
      web3.eth.getTransactionReceipt(resp.hash, function (err, rec) {
        if (rec) {
          console.log(rec)
          clearInterval(intervalId)
          intervalId = null
          res.status(200).json({ receipt: rec })
        }
      })
    }, 1000)
  }
}
