require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */

// const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
// const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
    solidity: { compilers: [{ version: "0.8.17" }, { version: "0.8.10" }] },
    networks: {
        goerli: {
            url: process.env.GOERLI_RPC_URL,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 5,
        },
    },
}
