from binance.client import Client
from binance.enums import *
#import config

def buy(client,tha_dough, currency):
    #client = Client(config.API_KEY,config.API_SECRET)

    order = client.futures_create_order(
        symbol = currency,
        side = SIDE_BUY,
        type= ORDER_TYPE_MARKET,
        #quoteOrderQty= tha_dough
        quantity = tha_dough
        )
    
    return order

#buy(Client(config.API_KEY,config.API_SECRET),2930,"BTCUSDT",)


