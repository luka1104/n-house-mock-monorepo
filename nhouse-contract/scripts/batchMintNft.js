require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/NhouseNFT.sol/NhouseNFT.json")
const contractAddress = "0x83979FB1FD5664cB59784Aa86f1bBaaf5DdFf7c0"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

const metadatas = [
  JSON.stringify({
    name: "Nhouse NFT",
    description: "An NFT from Nhouse",
    image: "https://art.pixilart.com/82d984fcd46cafb.gif",
    propertyName: "Nhouse Blue",
    reservedDate: "2023-07-22",
  }),
  JSON.stringify({
    name: "Nhouse NFT",
    description: "An NFT from Nhouse",
    image: "https://art.pixilart.com/82d984fcd46cafb.gif",
    propertyName: "Nhouse Blue",
    reservedDate: "2023-07-23",
  }),
  JSON.stringify({
    name: "Nhouse NFT",
    description: "An NFT from Nhouse",
    image: "https://art.pixilart.com/82d984fcd46cafb.gif",
    propertyName: "Nhouse Blue",
    reservedDate: "2023-07-24",
  }),
  JSON.stringify({
    name: "Nhouse NFT",
    description: "An NFT from Nhouse",
    image: "https://art.pixilart.com/82d984fcd46cafb.gif",
    propertyName: "Nhouse Blue",
    reservedDate: "2023-07-25",
  }),
  JSON.stringify({
    name: "Nhouse NFT",
    description: "An NFT from Nhouse",
    image: "https://art.pixilart.com/82d984fcd46cafb.gif",
    propertyName: "Nhouse Blue",
    reservedDate: "2023-07-26",
  }),
]

async function batchMintNFT(tokenURIs) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.batchMintNFT(PUBLIC_KEY, tokenURIs).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
        if (!err) {
          console.log(
            "The hash of your transaction is: ",
            hash,
            "\nCheck Alchemy's Mempool to view the status of your transaction!",
          )
        } else {
          console.log("Something went wrong when submitting your transaction:", err)
        }
      })
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

batchMintNFT(metadatas)
