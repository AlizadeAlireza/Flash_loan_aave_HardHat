# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

we want to use flashloans from the Aave and Defi protocol

# Flash loan

we can borrow as many tokens as we want without collateral provided that we pay it back as well
as a small fee all within the same transaction.

## common use cases of flash loans

refinancing, existing loans at lower rates and performing arbitrage.

arbitrage:

    is an investment strategy where we find a token in one exchange trading at a discount relative to another exchange.
    we buy low and sell high in order to capitalize on the opportunity and make it profit.

    with arbitrage we can borrow funds with no collateral in order to buy and sell token on different exchanges,
    pay the loan back and get the nice profit.

    if we don't have enough funds to pay back the loan the entire transaction gets reverted.
    so there's no risk of losing money.

## aave V3 protocol

1. we're going to invoke the Flash loans simple function in the Aave pool contract
   passing in the token that we want to borrow and the amount.

2. we'll call the approve function on the borrowed erc20 token for the amount
   borrowed plus the fee for allow aave to pull back those funds.

# implementing

## deposite funds

1. we use the 0.8.10 because that a lot of the aave contracts that we'll be
   using also use.

    we use FlashLoanSimpleReceiverBase:

    we need to implement this interface on order to our smart contract
    to be a receiver of a loan of a flash loan.

    we have some base contract and for using that we can just inherit from it.

    IERC20 and we need this in order to call the approve function on the token
    that we're borrowing.

2. we set a contstrucor to take the addressProvider but we're going to call
   the constructor of FlashLoanSimpleReceiverBase.
   next we're going to pass in the address to instantiate an instance of the IPOOL address provider interface.

3. write the execution option in the interface.
   add it override and curely braces to take it out of an interface.

    executeOperation():

    we have the borrowed funds in here.
    we can add any logic that we want.

POOL: is the instance of IPOOL interface

4. declare a function going to kick off the entire process and request the loan.

    requestFlashLoan():
    get two parameters and use flashLoanSimple interface.

5. declare a function for testing and see the balance of our contract.
   this is going to take a tokenAddress so we can look up the balance of any token.

    that will give us our balance this contracts balance of any token that we specify.

6. we need a withdrawal function because we'll want a way to withdraw our profits after the flashLoan is done.

    this is specific for a token.
    we do arbitrage with a USDC then we can specify that we want to withdraw
    all the USDC from this contract.

    we declare our interface and transfer it.

## how we can send the funds out to another contract after receiving the loan

we can do something with the loan, receive them back into the contract and payoff the loan.

for this work and semiulate our arbitrage, we can made another smart contract.

## Dex.sol

is a simplified decentralized Exchange.

this exchange works for two tokens, `dai` and `USDC`.

the user would basically approve a deposit for the token that they want to work with.

first approve a deposit for the token that they want to work with.

so we deposite USDC and this contract will custody the amount of USDC to see that we deposite,
then we're going to buy some DAI token, depositing that to the DAI Holding area and then sell the DAI
token for a profit.

## flashLoan Arbitrage

1. need to create an interface of the Dex contract in order for our flashLoan contract to talk with Dex contract.

2. need to grab a refrence to the addresses of the tokens that we'll be using : DAI, USDC and DexContractAddress (the place that contract deployed)

3. add custon logic in our executeOperation function.

    1. we're going to requesting 1000 USD loan from Aave.
    2. deposit it on the Dex contract and buy some DAI token at rate 90%.
    3. depsoit those DAI tokens back into the DEX contract.
    4. sell those DAI that we deposit.

    the Dex contract send us back USDC and we have more than we start with it.

4. approve some amount of USDC and DAI token.

    so the Dex contract can pull those amounts for our deposite.
    but can't do all this with one step.

    this is because the approvals need to be available on the BlockChain before
    any of these function Run.

5. we don't need to hold the funds in order to approve them.

    so we can still have a zero balance of USDC and put through an approval of whatever we intended to borrow.

## FlashLoanArbitrage.sol

### how to make profit here?

in the calculation of exchange rates there are two different rates being used.

dexARate and dexBRate.

dexARate = 90, means that i can buy DAItoken for the price of 90 cents on the USDC.
dexBRate = 100, use in cell function is 100, which represents a one-to-one value between DAItoken
USDC.

# testing on remix

we set the address of the contract that be saved, on at address section.
when we click the button we see our contract with few buttons that are our variables and functions.

we want to test this contract.

so we're going to start with one USDC.

1. so we request one USDC from Aave.
2. aave send us the money.
3. we're going receive the funds , approve the payback and then pay them back right away.
4. we shouldn't forget the fee. so we need send some USDC to the contract before we run this test.

## on the etherscan

1. first transaction is 1000 USDC into our smart contract.
2. second one is transfer of 1000 USDC from Smart contract to the Dex contract.
3. we have some amount of DAI.
4. deposite that amount of DAI.
5. we have purchase of USDC with that amount of DAI.
6. the payback of the loan + the amount of Fee.

last thing is check our flashLoan smartContract.
