
crypto = require('node:crypto');
const axios = require('axios');

require('dotenv').config()

//sample params: 'ETHBUSD', 0.01,'BUY'


async function cexSwapper(symbol, quantity, side){
  return new Promise(resolve => {

    const apiKey = process.env.binanceApiKey
    const secretKey = process.env.binanceApiSecret
  
    const endpoint = 'https://fapi.binance.com/fapi/v1/order';
    const timestamp = Date.now();
    
    const payload = {
      symbol,
      side: side,
      type: 'MARKET',
      quantity,
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
      resolve(true)
  })
}


module.exports = { cexSwapper };
