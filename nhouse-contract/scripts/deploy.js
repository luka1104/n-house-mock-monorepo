const { ethers } = require("hardhat")

async function main() {
  const NFT = await ethers.getContractFactory("NhouseNFT")

  const Nft = await NFT.deploy()
  await Nft.deployed()
  console.log("Contract deployed to address:", Nft.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
