const ethers  = require('ethers');
//const zksync = require('zksync');
const zksync =require("zksync-web3");

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESSgos
const WALLET_SECRET = process.env.WALLET_SECRETgos

    
const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");


async function velocoreTester(amountStr, direction) {
    const wETHAddress = '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91'
    const usdcAddress = '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4'
    const routerAddress = '0xB2CEF7f2eCF1f4f0154D129C6e111d81f68e6d03'
    const routerAbi = require("./velocoreRouterABI.json");

    // const factoryAddress = '0x2C1a605f843A2E18b7d7772f0Ce23c236acCF7f5'
    // const factoryABI = require("./maverickFactoryABI.json")

    const signer = new zksync.Wallet(WALLET_SECRET, zkSyncProvider)

    var tokenInAddress = ""
    var amount = ethers.BigNumber

    let wETHContract = new ethers.Contract(wETHAddress,zksync.utils.IERC20, signer)

    let usdcContract = new ethers.Contract(usdcAddress, zksync.utils.IERC20, signer)

    let route

    if (direction == 0) {
        tokenInAddress = wETHAddress
        amount = ethers.utils.parseEther(amountStr)
         route  = [[
            wETHAddress,
            usdcAddress,
            false
        ]]
    } else {
        tokenInAddress = usdcAddress
        amount = ethers.utils.parseUnits(amountStr, 6)
        console.log(ethers.utils.formatUnits(amount, 6))
    
        console.log("----")
        let allowedAmount = ethers.BigNumber = await usdcContract.allowance(signer.address, routerAddress)
        console.log(ethers.utils.formatUnits(allowedAmount, 6))

        if (allowedAmount.lte(ethers.utils.parseUnits('1790',6))) {
            
            let approveTx = await usdcContract.approve(routerAddress, ethers.utils.parseUnits('1810',6))
            await approveTx.wait()
        } 
         route  = [[
            usdcAddress,
            wETHAddress,
            false
        ]]
    }
    console.log(tokenInAddress)

    const router = new zksync.Contract(routerAddress, routerAbi, signer);

    // const factory = new zksync.Contract(factoryAddress, factoryABI, signer);
    // let pathh = ethers.utils.defaultAbiCoder.encode(["bytes" , "address", "bool"],[SwapCallbackData.path, SwapCallbackData.payer, SwapCallbackData.exactOutput])

    let response 

    if(direction == 0){

        response = await router.swapExactETHForTokens(
            ethers.constants.AddressZero,
            route,
            WALLET_ADDRESS,
            Math.floor(Date.now() / 1000) + 20 * 60,
            {
                value: amount,
                gasLimit: 10000000
            }
        );

    } 
    else{
        response = await router.swapExactTokensForETH(
            amount,
            ethers.constants.AddressZero,
            route,
            WALLET_ADDRESS,
            Math.floor(Date.now() / 1000) + 20 * 60,
            {
                gasLimit: 10000000
            }
        );
    }  
    

    try{let tx = await response.wait();
    console.log("Amazingly Done")}
    catch(E){console.log(E)}

}


//velocoreTester('0.009',0)

//velocoreTester('2',1)


module.exports = { velocoreTester }