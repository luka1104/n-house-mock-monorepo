import Web3 from "web3"
import contract from "@/contracts/NhouseNFT.json"
import { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://evm.astar.network"
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || "0x872449c44937f6Ac266cbBCDCb189B25AcEBb9E9"
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY || ""
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xeeF566179E2896aFE3bA1E456088e6fe670C4801"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, tokenId } = req.body
  const web3 = new Web3(API_URL)
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
  await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY, async (err, signedTx) => {
    if (err) return console.log("SIGN ERROR", err)
    console.log("SIGNING", signedTx)
    await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string, (err, resp) => {
      if (err) return console.log("TRANSFER ERROR", err)
      console.log("RESERVING", resp)
      res.status(200).send("SUCCESS RESERVING")
    })
  })
}
