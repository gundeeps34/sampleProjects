const ethers  = require('ethers');
//const zksync = require('zksync');
const zksync =require("zksync-web3");


async function maverickSwapper(amountStr, direction) {

    require('dotenv').config()
    const INFURA_URL_TESTNET = process.env.INFURA_URL_TESTNET
    const WALLET_ADDRESS = process.env.WALLET_ADDRESSgos
    const WALLET_SECRET = process.env.WALLET_SECRETgos

        
    const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");


    const wETHAddress = '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91'
    const usdcAddress = '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4'
    const routerAddress = '0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4'
    const routerAbi = require("./maverickRouterABI.json");

    const factoryAddress = '0x2C1a605f843A2E18b7d7772f0Ce23c236acCF7f5'
    const factoryABI = require("./maverickFactoryABI.json")

    const signer = new zksync.Wallet(WALLET_SECRET, zkSyncProvider)

    var tokenInAddress = ""
    var amount = ethers.BigNumber

    let wETHContract = new ethers.Contract(wETHAddress,zksync.utils.IERC20, signer)

    let usdcContract = new ethers.Contract(usdcAddress, zksync.utils.IERC20, signer)

    if (direction == 0) {
        tokenInAddress = wETHAddress
        amount = ethers.utils.parseEther(amountStr)
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
    }
    console.log(tokenInAddress)

    const router = new zksync.Contract(routerAddress, routerAbi, signer);

    const factory = new zksync.Contract(factoryAddress, factoryABI, signer);

    const poolAddress = '0x74a8f079eb015375b5dbb3ee98cbb1b91089323f'

    const poolAbi = require('./maverickPoolABI.json')

    const pool = new ethers.Contract(poolAddress,poolAbi, signer)

    let SwapCallbackData = {
        path: ethers.utils.solidityPack(["address", "address" ,"address"] , [wETHAddress, poolAddress, usdcAddress]),
        payer: WALLET_ADDRESS,
        exactOutput: false
    }

    let pathh = ethers.utils.defaultAbiCoder.encode(["bytes" , "address", "bool"],[SwapCallbackData.path, SwapCallbackData.payer, SwapCallbackData.exactOutput])

    let response 
    let another_eater

    if(direction == 0){
        const callData = [
            router.interface.encodeFunctionData("exactInputSingle", [
            [
                wETHAddress,
                usdcAddress,
                poolAddress,
                WALLET_ADDRESS,
                Math.floor(Date.now() / 1000) + 20 * 60,
                amount,
                0, //minAmountOut
                0
            ],
        ]) 
        ]
        // callData.push(
        //     router.interface.encodeFunctionData("unwrapWETH9", [
        //       amount.toString(),
        //       WALLET_ADDRESS,
        //     ])
        //   );

         response = await router.multicall(callData, {
            value: amount
        });
    } 
    else{
        const callData = [
            router.interface.encodeFunctionData("exactInputSingle", [
            [
                usdcAddress,
                wETHAddress,
                poolAddress,
                WALLET_ADDRESS,
                Math.floor(Date.now() / 1000) + 20 * 60,
                amount,
                0, //minAmountOut
                0
            ],
        ]) 
        ]
        const wether = [
            router.interface.encodeFunctionData("unwrapWETH9", [
             
                ethers.utils.parseEther('0.000011').toString(),
                WALLET_ADDRESS
             
            ])
        ];

        //  response = await router.multicall(callData, {
        //     gasLimit: ethers.BigNumber.from('2000000')
        // });

         another_eater = await router.multicall(wether, {
            gasLimit: ethers.BigNumber.from('2000000')
        });


    }  
    

    try{//let tx = await response.wait();
       let something =  await response.wait()
    console.log("Amazingly Done")}
    catch(E){console.log(E)}

}


//maverickSwapper('2',1)

module.exports = { maverickSwapper }

// module.exports = { maverickSwapper }

/*let callData = [
            router.interface.encodeFunctionData("exactInputSingle", [
           [
                fromTokenAddr,
                toTokenAddr,
                "0x74a8f079eb015375b5dbb3ee98cbb1b91089323f",
                zkSyncWallet.address,
                Math.floor(Date.now() / 1000) + 20 * 60, // deadline // 30 minutes
                amount,
                0, //minAmountOut
                0, 
            ],
            ]),
          ];
          callData.push(
            router.interface.encodeFunctionData("unwrapWETH9", [
              wEthBalance.toString(),
              zkSyncWallet.address,
            ])
          );

        const response = await router.multicall(callData, {
            gasLimit: ethers.BigNumber.from('2000000')
        });

        const receipt = await response.wait(); */