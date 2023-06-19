require("dotenv").config()
const Web3 = require("web3")
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const CONTRACT_ADDRESS = "0xeeF566179E2896aFE3bA1E456088e6fe670C4801"
const contract = require("../artifacts/contracts/NhouseNFT.sol/NhouseNFT.json")

const fetchMetadata = async () => {
  const web3 = new Web3(API_URL)
  const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)
  nftContract.methods.getTokenUriFromAddress(PUBLIC_KEY).call().then(console.log)
}

fetchMetadata()
