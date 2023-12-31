/**
 * @type import(‘hardhat/config’).HardhatUserConfig
 */
require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
const { API_URL, PRIVATE_KEY } = process.env
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "astar",
  networks: {
    hardhat: {},
    astar: {
      url: API_URL,
      chainId: 592,
      accounts: [PRIVATE_KEY],
    },
  },
}
