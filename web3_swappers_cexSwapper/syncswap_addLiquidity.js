/*const ethers  = require('ethers');
//const zksync = require('zksync');
const zksync =require("zksync-web3");

require('dotenv').config()
const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

    
const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");
const ethProvider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET)


async function syncSwapAddLiquidity(usdtAmount, usdcAmount) {
    //const wETHAddress = '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91'
    const usdtAddress = '0x493257fd37edb34451f62edf8d2a0c418852ba4c'
    const usdcAddress = '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4'
    //const poolAddressUSDCUSDT = '0x0e595bfcafb552f83e25d24e8a383f88c1ab48a4'
    const routerAddress = '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295'
    //const classicPoolFactoryAddress = '0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb'
    //const classicPoolFactoryAbi = require("./SyncSwapClassicPoolFactoryABI.json")
    const stablePoolFactoryAddress = '0x5b9f21d407F35b10CbfDDca17D5D84b129356ea3'
    const stablePoolFactoryAbi = require('./stablePoolFactoryAbi.json')
    const routerAbi = require("./SyncSwapRouterABI.json");

    const signer = new zksync.Wallet(WALLET_SECRET, zkSyncProvider, ethProvider)

    var tokenInAddress = ""
    var amount1 = ethers.BigNumber


    tokenInAddress = usdcAddress
    amount1 = ethers.utils.parseUnits(usdcAmount, 6)

    const usdcContract = new ethers.Contract(usdcAddress, zksync.utils.IERC20, signer)
    console.log("----")
    let allowedAmount = ethers.BigNumber = await usdcContract.allowance(signer.address, routerAddress)
    console.log(ethers.utils.formatUnits(allowedAmount, 6))

    if (allowedAmount.lte(amount1)) {
        
        let approveTx = await usdcContract.approve(routerAddress, amount1)
        await approveTx.wait()
    } 
    
    console.log(tokenInAddress)


    tokenInAddress = usdtAddress
    let amount2 = ethers.utils.parseUnits(usdtAmount, 6)
    //console.log(ethers.utils.formatUnits(amount2, 6))

    const usdtContract = new ethers.Contract(usdtAddress, zksync.utils.IERC20, signer)
    console.log("----")
    let allowedAmount2 = ethers.BigNumber = await usdtContract.allowance(signer.address, routerAddress)
    console.log(ethers.utils.formatUnits(allowedAmount2, 6))

    if (allowedAmount2.lte(amount2)) {
        
        let approveTx = await usdtContract.approve(routerAddress, amount2)
        await approveTx.wait()
    } 
    
    console.log(tokenInAddress)
    // The factory of the Classic Pool.


    // The factory of the Classic Pool.
    const stablePoolFactory = new zksync.Contract(
        stablePoolFactoryAddress,
        stablePoolFactoryAbi,
        zkSyncProvider
    );

    // Gets the address of the ETH/USDC Classic Pool.
    // wETH is used internally by the pools.
    const poolAddress = await stablePoolFactory.getPool(usdtAddress, usdcAddress);

    // Checks whether the pool exists.
    if (poolAddress === ethers.constants.AddressZero) {
        console.log('pool not exists')
        return
    }else{console.log(poolAddress)}



    const tokenInput = [{
        token: usdtAddress,
        amount: amount1
    },
    {
        token: usdcAddress,
        amount: amount2
    }
    ];


    let byteData = ethers.utils.defaultAbiCoder.encode(['address','address'],[usdtAddress,usdcAddress]);

    const router = new zksync.Contract(routerAddress, routerAbi, signer);


    const response = await router.addLiquidity(
        poolAddress, // paths
        tokenInput, // amountOutMin // Note: ensures slippage here
        byteData,
        '0',
        WALLET_ADDRESS,
        '0x',
        {
            //value: amount, // please uncomment this if your token in is ETH
            gasLimit: 14000000
        }
    );

    let tx = await response.wait();
    console.log(tx.transactionHash)
}


syncSwapAddLiquidity('0.01','0.01')*/

const ethers = require('ethers')

const zksync =require("zksync-web3");



async function AddLP(){

    require('dotenv').config()
    const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET
    const WALLET_ADDRESS = process.env.WALLET_ADDRESS
    const WALLET_SECRET = process.env.WALLET_SECRET

        
    const provider = new zksync.Provider("https://mainnet.era.zksync.io");

    const poolAddress = '0x80115c708E12eDd42E504c1cD52Aea96C547c05c'

    const routerAddress = '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295'
    const classicPoolFactoryAddress = '0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb'
    const classicPoolFactoryAbi = require("./SyncSwapClassicPoolFactoryABI.json")
    const stablePoolFactoryAddress = '0x5b9f21d407F35b10CbfDDca17D5D84b129356ea3'
    const stablePoolFactoryAbi = require('./stablePoolFactoryAbi.json')
    const routerAbi = require("./SyncSwapRouterABI.json");


    const usdcAddress = '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4'

    const signer = new zksync.Wallet(WALLET_SECRET, provider)

    const amount1 = ethers.utils.parseUnits('5',6)

    const ethValue = ethers.utils.parseEther('0.003')

    const usdcContract = new ethers.Contract(usdcAddress, zksync.utils.IERC20, signer)
    console.log("----")
    let allowedAmount = ethers.BigNumber = await usdcContract.allowance(signer.address, routerAddress)
    //console.log(ethers.utils.formatUnits(allowedAmount, 6))

    if (allowedAmount.lte(amount1)) {
        
        let approveTx = await usdcContract.approve(routerAddress, amount1)
        await approveTx.wait()
    } 

    const router = new zksync.Contract(routerAddress, routerAbi, signer);

    const inputs = [
        {
            token: usdcAddress,
            amount: amount1
        },
        {
            token: ethers.constants.AddressZero,
            amount: ethValue
        }
    ]
    const dataField = ethers.utils.defaultAbiCoder.encode(['address'],[WALLET_ADDRESS])
    
    const gasPrice = await provider.getGasPrice()
    const gasLimit = await router.estimateGas.addLiquidity2(
        poolAddress,
        inputs,
        dataField,
        ethers.BigNumber.from(0), // minLiquidity
        ethers.constants.AddressZero, // callback
        '0x', // callbackData
        { gasPrice, value: ethValue } 
    )

    const response = await router.addLiquidity2(
        poolAddress,
        inputs,
        dataField,
        ethers.BigNumber.from(0), // minLiquidity
        ethers.constants.AddressZero, // callback
        '0x', // callbackData
        { gasPrice, gasLimit, value: ethValue }
    )

    const result = await response.wait(1)
    console.log(result)

}


AddLP()

