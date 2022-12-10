const hre = require("hardhat")

async function main() {
    console.log("deploying...")
    const FlashLoanArbitrage = await hre.ethers.getContractFactory("FlashLoanArbitrage")
    const flashLoanArbitrage = await FlashLoanArbitrage.deploy(
        "0x8870b6053DC7Da5DCCFcbBD1649643E9224F93B1"
    )

    await flashLoanArbitrage.deployed()

    console.log("Flash loan contract deployed: ", flashLoanArbitrage.address)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
