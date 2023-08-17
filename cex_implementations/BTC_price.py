'''from binance.client import Client
import config
from binance.enums import *


def price1(currency):
    client = Client(config.API_KEY,config.API_SECRET)
    pricee = client.get_order_book(symbol=currency,limit =5)
    #pricee = client.get_all_tickers()
    # print full output (dictionary)
    return pricee#["price"]#[11]['price']'''

import requests
from requests.exceptions import ConnectionError, Timeout

import writerBTC as w



def yt(currency):
    payload = {'symbol': currency}
    max_retries = 3
    timeout=40

    for i in range(max_retries):
        try:
            response = requests.get('https://fapi.binance.com/fapi/v1/premiumIndex', params=payload,timeout=timeout)
            # If the request succeeds, break out of the loop
            break
        except (ConnectionError, Timeout):
            # If the request fails, increase the timeout value and retry
            timeout *= 2
    # Make a GET request to the /fapi/v1/premiumIndex endpoint

    # Parse the response JSON and extract the mark price
    data = response.json()
    try:
        latest_price = data['markPrice']
    except Exception as e:
        print(str(e) + str(data))

    # Print the latest mark price to the console
    return latest_price

while True:
    w.write_to_file(yt("BTCUSDT"))


#print(price("BTCUSDT"))

'''import requests
from requests.exceptions import ConnectionError, Timeout

# Define the maximum number of retries
max_retries = 3

# Define the initial timeout value
timeout = 10

# Retry the request with exponential backoff
for i in range(max_retries):
    try:
        response = requests.get('https://api.binance.com/api/v3/ticker/price', timeout=timeout)
        # If the request succeeds, break out of the loop
        break
    except (ConnectionError, Timeout):
        # If the request fails, increase the timeout value and retry
        timeout *= 2
'''



'''import json
import requests
  
# defining key/request url
key = "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
  
# requesting data from url
data = requests.get(key)  
data = data.json()
print(f"{data['symbol']} price is {data['price']}")'''