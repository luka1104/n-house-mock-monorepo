require("dotenv").config()
const Web3 = require("web3")
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const CONTRACT_ADDRESS = "0x83979FB1FD5664cB59784Aa86f1bBaaf5DdFf7c0"
const contract = require("../artifacts/contracts/NhouseNFT.sol/NhouseNFT.json")

const fetchMetadata = async () => {
  const web3 = new Web3(API_URL)
  const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)
  nftContract.methods.getTokenUriFromAddress(PUBLIC_KEY).call().then(console.log)
}

fetchMetadata()
