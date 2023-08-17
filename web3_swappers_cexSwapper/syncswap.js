const ethers  = require('ethers');
//const zksync = require('zksync');
const zksync =require("zksync-web3");

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESS
const WALLET_SECRET = process.env.WALLET_SECRET

    
const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");

async function syncSwapETHUSDC(amountStr, direction) {
    const wETHAddress = '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91'
    const usdcAddress = '0x493257fd37edb34451f62edf8d2a0c418852ba4c'
    const routerAddress = '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295'
    const classicPoolFactoryAddress = '0xf2DAd89f2788a8CD54625C60b55cD3d2D0ACa7Cb'
    const classicPoolFactoryAbi = require("./SyncSwapClassicPoolFactoryABI.json")
    const routerAbi = require("./SyncSwapRouterABI.json");

    const signer = new zksync.Wallet(WALLET_SECRET, zkSyncProvider)

    var tokenInAddress = ""
    var amount = ethers.BigNumber

    if (direction == 0) {
        tokenInAddress = wETHAddress
        amount = ethers.utils.parseEther(amountStr)
    } else {
        tokenInAddress = usdcAddress
        amount = ethers.utils.parseUnits(amountStr, 6)
        console.log(ethers.utils.formatUnits(amount, 6))
        
        const usdcContract = new ethers.Contract(usdcAddress, zksync.utils.IERC20, signer)
        console.log("----")
        let allowedAmount = ethers.BigNumber = await usdcContract.allowance(signer.address, routerAddress)
        console.log(ethers.utils.formatUnits(allowedAmount, 6))

        if (allowedAmount.lte(ethers.utils.parseUnits('1790',6))) {
            
            let approveTx = await usdcContract.approve(routerAddress, ethers.utils.parseUnits('1810',6))
            await approveTx.wait()
        } 
    }
    console.log(tokenInAddress)
    // The factory of the Classic Pool.
    const classicPoolFactory = new zksync.Contract(
        classicPoolFactoryAddress,
        classicPoolFactoryAbi,
        zkSyncProvider
    );

    // Gets the address of the ETH/USDC Classic Pool.
    // wETH is used internally by the pools.
    const poolAddress = await classicPoolFactory.getPool(wETHAddress, usdcAddress);

    // Checks whether the pool exists.
    if (poolAddress === ethers.constants.AddressZero) {
        console.log('pool not exists')
        return
    }else{console.log(poolAddress)}

   
    const withdrawMode = 1; // 1 or 2 to withdraw to user's wallet

    let swapData = ethers.utils.defaultAbiCoder.encode(
        ["address", "address", "uint8"],
        [tokenInAddress, signer.address, withdrawMode], // tokenIn, to, withdraw mode
    );

    const steps = [{
        pool: poolAddress,
        data: swapData,
        callback: ethers.constants.AddressZero,
        callbackData: '0x',
    }];


    const paths = [{
        steps: steps,
        tokenIn: (direction == 0) ? ethers.constants.AddressZero : tokenInAddress,
        amountIn: amount,
    }];

    const router = new zksync.Contract(routerAddress, routerAbi, signer);

    const response = await router.swap(
        paths, // paths
        amount, // amountOutMin // Note: ensures slippage here
        ethers.BigNumber.from(Math.floor(Date.now() / 1000)).add(1800), // deadline // 30 minutes
        {
            value: amount, // please uncomment this if your token in is ETH
            gasLimit: 1400000
        }
    );

    try{let tx = await response.wait();}
    catch(E){console.log("too high slippage or price not it")}

    //console.log(tx.transactionHash)
    //console.log(response)
}


//syncSwapETHUSDC('0.00009',0)

module.exports = { syncSwapETHUSDC }