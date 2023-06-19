import Web3 from "web3"
import contract from "@/contracts/NhouseNFT.json"
import { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://evm.astar.network"
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY || "0x872449c44937f6Ac266cbBCDCb189B25AcEBb9E9"
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xeeF566179E2896aFE3bA1E456088e6fe670C4801"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, tokenId } = req.body
  const web3 = new Web3(API_URL)
  const nftContract = new web3.eth.Contract((contract as any).abi, CONTRACT_ADDRESS)
  await nftContract.methods
    .transferFrom(PUBLIC_KEY, address, JSON.parse(tokenId))
    .call((err: any, result: any) => {
      if (err) {
        console.log("An error occured", err)
        res.status(500).send("An error occured")
        return
      }
      console.log(result)
      res.status(200).json(result)
    })
}
