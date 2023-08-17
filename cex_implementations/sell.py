from binance.client import Client
import config
from binance.enums import *

def sell(client,tha_dough, currency ):
    #client = Client(config.API_KEY,config.API_SECRET)

    order = client.futures_create_order(
        symbol = currency,
        side = SIDE_SELL,
        type= ORDER_TYPE_MARKET,
        quantity = tha_dough
        )
    
    return order
