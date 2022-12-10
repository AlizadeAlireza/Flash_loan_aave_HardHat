const hre = require("hardhat")

async function main() {
    const FlashLoan = await hre.ethers.getContractFactory("FlashLoan")
    // instant of our contract
    const flashLoan = await FlashLoan.deploy("0x8870b6053DC7Da5DCCFcbBD1649643E9224F93B1") // here is we pass the provider address

    await flashLoan.deployed()
    console.log("Flash Loan contract deployed: ", flashLoan.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
