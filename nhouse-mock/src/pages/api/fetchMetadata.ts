import Web3 from "web3"
import contract from "@/contracts/NhouseNFT.json"
import { NextApiRequest, NextApiResponse } from "next"
const API_URL = process.env.API_URL || "https://evm.astar.network"
const PUBLIC_KEY = process.env.PUBLIC_KEY || "0x"
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0xfEE418A3c546580c5fe6D57113179951bfef62e5"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const web3 = new Web3(API_URL)
  const nftContract = new web3.eth.Contract((contract as any).abi, CONTRACT_ADDRESS)
  await nftContract.methods.getTokenUriFromAddress(PUBLIC_KEY).call((err: any, tokenUris: any) => {
    if (err) {
      console.log("An error occured", err)
      res.status(500).send("An error occured")
      return
    }
    tokenUris = tokenUris.map((uri: string) => JSON.parse(uri))
    console.log(tokenUris)
    res.status(200).json(tokenUris)
  })
}
