const ethers  = require('ethers');
//const zksync = require('zksync');
const zksync =require("zksync-web3");

require('dotenv').config()
const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

    
const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");
const ethProvider = new ethers.providers.JsonRpcProvider(INFURA_URL_TESTNET)


async function syncSwapETHUSDC(amountStr, direction) {
    const wETHAddress = '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91'
    const usdtAddress = '0x493257fd37edb34451f62edf8d2a0c418852ba4c'
    const usdcAddress = '0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4'
    const classicPoolFactoryAddress = '0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb'
    const classicPoolFactoryAbi = require("./SyncSwapClassicPoolFactoryABI.json")
    const routerAddress = '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295'
    const poolMasterAddress = '0xbB05918E9B4bA9Fe2c8384d223f0844867909Ffb'
    const poolMasterAddressAbi = require("./syncSwapPoolMaster.json")
    const routerAbi = require("./SyncSwapRouterABI.json");

    const signer = new zksync.Wallet(WALLET_SECRET, zkSyncProvider, ethProvider)

    // The factory of the Classic Pool.
    const classicPoolFactory = new zksync.Contract(
        classicPoolFactoryAddress,
        classicPoolFactoryAbi,
        zkSyncProvider
    );

    const poolMaster = new zksync.Contract(
        poolMasterAddress,
        poolMasterAddressAbi,
        zkSyncProvider
    );
    // Gets the address of the ETH/USDC Classic Pool.
    // wETH is used internally by the pools.
    const poolAddress = await classicPoolFactory.getPool(wETHAddress, usdtAddress);

    // Checks whether the pool exists.
    if (poolAddress === ethers.constants.AddressZero) {
        console.log('pool not exists')
        return
    }else{console.log(poolAddress)}


   const ffe = await poolMaster.getProtocolFee(poolAddress);
   console.log("protocol: ", ffe)

   let byteData = ethers.utils.defaultAbiCoder.encode(
    ["address", "address"],[wETHAddress,usdtAddress]
    );

    const fee2 = await classicPoolFactory.getSwapFee(poolAddress,WALLET_ADDRESS,wETHAddress,usdtAddress,byteData);

    console.log("swap fee: ",fee2)

    console.log("total amount in wei: " , (fee2 + ffe))

    const feeManagerAddress = await poolMaster.feeManager();
    const feeManagerAbi = require('./syncswapFeeManager.json')

    const feeManager = new zksync.Contract(
        feeManagerAddress,
        feeManagerAbi,
        zkSyncProvider
    );


    await poolMaster.setFeeManager(feeManager)

    const ffee = await feeManager.poolSwapFee(poolAddress);

    console.log("manager: ", ffee)



}

function formatWeiTo19Digits(wei) {
    const weiString = wei.toString();
    const paddingZeros = '0'.repeat(19 - weiString.length);
    return weiString + paddingZeros;
}


syncSwapETHUSDC('0.00009',0)