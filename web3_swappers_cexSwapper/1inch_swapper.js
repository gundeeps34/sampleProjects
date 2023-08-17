const Web3 = require('web3')
const axios = require('axios')

const zksync =require("zksync-web3");

require('dotenv').config()

const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");

const PRIVATE_KEY = process.env.WALLET_SECRET

const web3 = new Web3("https://mainnet.era.zksync.io")
const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY)

async function swapper(url){
    try{
        const response = await axios.get(url)
        if(response.data){
            data = response.data
            data.tx.gas = 1000000
            tx = await web3.eth.sendTransaction(data.tx)
            if(tx.status){
                console.log("Swap Successfull! :)")
            }
        }
    }catch(err){
        console.log("swapper encountered an error below")
        console.log(err)
    }

}

let amount = "900000000000000"

let firstToken = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"

let secondToken = "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4"

const urll = "https://api.1inch.io/v5.0/324/swap?fromTokenAddress=" + firstToken.toString() + "&toTokenAddress=" + secondToken.toString() + "&amount=" + amount.toString() + "&fromAddress=" + wallet.address + "&slippage=1";



swapper(urll)