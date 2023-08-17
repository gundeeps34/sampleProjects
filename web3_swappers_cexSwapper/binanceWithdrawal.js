const axios = require('axios')
const crypto = require('crypto');

const { setTimeout } = require("timers/promises");

const WITHDRAW_AMOUNT = 10; 

require('dotenv').config()

const withdrawFromBinanceToBSC = async () => {
  try {
    const apiKey = process.env.testerKey
    const ARB_WALLET_ADDRESS =  process.env.WALLET_ADDRESS; 
    const secretKey = process.env.testerSecret
    const timestamp = Date.now();

    const endpoint = 'https://api.binance.com/sapi/v1/capital/withdraw/apply/';

    const payload = {
        coin: 'USDT',
        network: 'ARBITRUM',
        address: ARB_WALLET_ADDRESS,
        amount: WITHDRAW_AMOUNT,
        timestamp,
      };
      
      const queryString = Object.keys(payload)
        .map(key => `${key}=${payload[key]}`)
        .join('&');
      
      const signature = crypto
        .createHmac('sha256', secretKey)
        .update(queryString)
        .digest('hex');

      
      const requestConfig = {
        headers: {
          'X-MBX-APIKEY': apiKey,
        },
        params: {
          ...payload,
            signature,
        },
      };
      
      axios.post(endpoint, null, requestConfig)
        .then(response => {
          console.log('Order executed:', response.data);
          return true;
        })
        .catch(error => {
          console.error('Error:', error.response.data);
          return false;
        });
  } catch (error) {
    console.error('Error:', error);
  }
};

withdrawFromBinanceToBSC();
