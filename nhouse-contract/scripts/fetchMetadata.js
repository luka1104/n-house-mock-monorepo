require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const contractAddress = "0xfEE418A3c546580c5fe6D57113179951bfef62e5"
const contract = require("../artifacts/contracts/NhouseNFT.sol/NhouseNFT.json")

const provider = new Web3(new Web3.providers.HttpProvider(API_URL))
const Contract = new provider.eth.Contract(contract.abi, contractAddress, { from: PUBLIC_KEY })
await Contract.methods.getTokenUriFromAddress(req.body.address).call((err, tokenUris) => {
  if (err) {
    console.log("An error occured", err)
    return
  }
  tokenUris = tokenUris.map((uri) => JSON.parse(uri))
  console.log(tokenUris)
})
