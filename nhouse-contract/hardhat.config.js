/**
 * @type import(‘hardhat/config’).HardhatUserConfig
 */
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
const { API_URL, GOERLI_RPC, PRIVATE_KEY } = process.env
module.exports = {
  solidity: "0.8.9",
  // defaultNetwork: "mumbai",
  // networks: {
  //   hardhat: {},
  //   goerli: {
  //     url: `${GOERLI_RPC}`,
  //     accounts: [`0x${PRIVATE_KEY}`],
  //   },
  //   mumbai: {
  //     url: API_URL,
  //     accounts: [`0x${PRIVATE_KEY}`],
  //   },
  // },
}
