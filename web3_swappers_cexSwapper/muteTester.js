const ethers  = require('ethers');

const zksync =require("zksync-web3");

const routerAbi = require("./muteRouter.json");

require('dotenv').config()
const WALLET_ADDRESS = process.env.WALLET_ADDRESSgos
const WALLET_SECRET = process.env.WALLET_SECRETgos

    
const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");


async function muteETHUSDC(amountStr, direction) {
    const wETHAddress = '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91'
    const usdcAddress = '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4'
    const routerAddress = '0x8B791913eB07C32779a16750e3868aA8495F5964'

    const signer = new zksync.Wallet(WALLET_SECRET, zkSyncProvider)

    var tokenInAddress = ""
    var amount = ethers.BigNumber
    let digits = 0;

    if (direction == 0) {
        tokenInAddress = wETHAddress
        amount = ethers.utils.parseEther(amountStr)
        digits = 18;
    } else {
        digits = 6;
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
            console.log(approveTx)
        } 
    }
    console.log(tokenInAddress)


    const router = new zksync.Contract(routerAddress, routerAbi, signer);

    /* // 
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline,
        bool[] calldata stable
    ) external returns (uint[] memory amounts);*/
    let something;
    let response;
    if(direction == 0){
        something = await router.getAmountsOut(
            amount, 
            [wETHAddress,usdcAddress],
            [false,false]
        )
         response = await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
            something[1].toString(),
            [wETHAddress,usdcAddress],
            WALLET_ADDRESS,
            ethers.BigNumber.from(Math.floor(Date.now() / 1000)).add(1800),
            [false,false],
            {
                value: amount,
                gasLimit: 10000000,
            }
        );
    }
    else{
        something = await router.getAmountsOut(
            amount, 
            [usdcAddress,wETHAddress],
            [false,false]
        )
        console.log(ethers.utils.formatEther(something[1].toString()))
        response = await router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            amount,
            something[1].toString(),
            [usdcAddress,wETHAddress],
            WALLET_ADDRESS,
            ethers.BigNumber.from(Math.floor(Date.now() / 1000)).add(1800),
            [false,false],
            {
                gasLimit: 10000000,
            }
        );

    }


    try{let tx = await response.wait();
    console.log("Successfully done")
    }
    catch(E){console.log(E)}


    //console.log(tx.transactionHash)
    //console.log(response)
}


//muteETHUSDC('0.009',0)

//muteETHUSDC('5',1)

module.exports = { muteETHUSDC }

//console.log(ethers.utils.formatUnits(181154,6))