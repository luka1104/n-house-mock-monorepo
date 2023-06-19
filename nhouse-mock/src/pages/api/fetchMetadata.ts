import { NextRequest, NextResponse } from "next/server"
import Web3 from "web3"
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const CONTRACT_ADDRESS = "0xfEE418A3c546580c5fe6D57113179951bfef62e5"
const contract = require("../artifacts/contracts/NhouseNFT.sol/NhouseNFT.json")

const handler = async (req: NextRequest, res: NextResponse) => {
  const provider = new Web3(new Web3.providers.HttpProvider(RPC))
  const Contract = new provider.eth.Contract(contract.abi, contractAddress, { from: PUBLIC_KEY })
  await Contract.methods.getTokenUriFromAddress(req.body.address).call((err, tokenUris) => {
    if (err) {
      console.log("An error occured", err)
      res.status(500).send("An error occured")
      return
    }
    tokenUris = tokenUris.map((uri) => JSON.parse(uri))
    console.log(tokenUris)
    res.status(200).send(tokenUris)
  })
}
