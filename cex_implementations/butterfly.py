import buy as b
import sell as s
import BTC_price as p


import time
import requests
from binance.client import Client
import config
from binance.enums import *


global currency
global tha_dough   #the amount of USDT we wanna buy or sell
global mark_price
global BREAK_PRICE
global orderId
global diff
global TELE_TOKEN
global chat_id
global ping_pong
global old
global client
global ping_pong_count
global side
global ans
global boo
global SECONDS
global end_price
global step_size
global initial_BP
global stop_limit

boo = False

end_price = 0

TELE_TOKEN = "6034277983:AAHKdYppG-cw3FBII7wLisDoSbWfw_GwbHo"
TELE_TOKEN2 = "5903882275:AAGApm67fCPcuMHynovZGmS2yMjmQjnQhlM" 
chat_id = "5789191868"
chat_id2 = "566644123"
currency = ""
ping_pong_count = 100000000
BREAK_PRICE = 1000000000
tha_dough = 0
diff = 100000
SECONDS = time.time()

def main(BREAK,AMOUN,PING,currenc,stop_lm):
    #try:    
    global mark_price
    make_values(BREAK,AMOUN,PING)
    global currency
    global side
    global tha_dough   #the amount of USDT we wanna buy or sell
    global BREAK_PRICE
    global orderId
    global diff
    global TELE_TOKEN
    global chat_id
    global ping_pong
    global old
    global client
    global ping_pong_count
    global ans
    global SECONDS
    global boo
    global end_price
    global step_price
    global stop_limit 
    global initial_BP

    initial_BP = BREAK_PRICE

    stop_limit = stop_lm

    client = Client(config.API_KEY,config.API_SECRET)

    old = time.time()

    ping_pong = 0

    currency = currenc

    message = "None"

    mark_price = round(float(p.price(currency)),1)

    diff = stop_lm

    coo = "llllllll"

    while True:
        mark_price = round(float(p.price(currency)),1)
        print(mark_price)
        if(mark_price > BREAK_PRICE + diff and mark_price < BREAK_PRICE + diff + 10):
            yu = b.buy(client,tha_dough , currency)
            coo = "long"
            break
        elif(mark_price < BREAK_PRICE - diff and mark_price > BREAK_PRICE - diff -10):
            yu = s.sell(client,tha_dough , currency)
            coo = "short"
            break
        else:
            pass

    print(yu)
    orderId = yu["orderId"]
    mo = coo + " INTITIATED OF " + str(tha_dough) + " IN CURRENCY  " + currency + " AT " + str(mark_price) + " BOT"

    
    message = coo + " INTITIATED OF " + str(tha_dough) + " IN CURRENCY  " + currency + " AT " + str(mark_price) + " BOT"
    url = f"https://api.telegram.org/bot{TELE_TOKEN}/sendMessage?chat_id={chat_id}&text={message}"
    url2 = f"https://api.telegram.org/bot{TELE_TOKEN2}/sendMessage?chat_id={chat_id2}&text={message}"
    requests.get(url).json() 
    requests.get(url2).json()
    ans = "WHERES YOUR BUGGATI TOURNE DANS LA VIDE ANSI BA LA VIDA TRISTAN IS THE BEST"
    while True: 
        print(f"{ans} IN CURRENCY {currency} AND BREAK PRICE IS {BREAK_PRICE}, the total amount {tha_dough} (in BTC/ETH) and the difference is {diff}")
        SECONDS = time.time()

        '''if(boo == True):
            if(old - SECONDS > 300):
                boo = False'''

        #lg.logg(mark_price)

        if(ping_pong == ping_pong_count and boo == False):
                message = f"PING PONG COUNT IS AT {ping_pong}"
                url = f"https://api.telegram.org/bot{TELE_TOKEN}/sendMessage?chat_id={chat_id}&text={message}"
                url2 = f"https://api.telegram.org/bot{TELE_TOKEN2}/sendMessage?chat_id={chat_id2}&text={message}"
                requests.get(url).json() 
                requests.get(url2).json()
                ping_pong = 0
                #boo = True
                old = time.time()

        '''YEAR        = datetime.date.today().year     # the current year
        MONTH       = datetime.date.today().month    # the current month
        DATE        = datetime.date.today().day      # the current day
        HOUR        = datetime.datetime.now().hour   # the current hour
        MINUTE      = datetime.datetime.now().minute # the current minute
        #SECONDS     = datetime.datetime.now().second # the current second'''
            
        mark_price = round(float(p.price(currency)),1)
        print(mark_price)
            
        ans = choose(mark_price,side)

        if(ans == "long"):
            yu = b.buy(client,tha_dough *2 , currency)
            copa = "INITIATED"
        elif(ans == "short"):
            yu = s.sell(client,tha_dough *2 , currency)
            copa = "INITIATED"
        else:
            copa = "n"
        
        if(copa != "n"):
            print(yu)
            orderId = yu["orderId"]
            mo = ans + " INTITIATED OF " + str(tha_dough) + " IN CURRENCY  " + currency + " AT " + str(mark_price) + " BOT"

            
            message = "long INTITIATED OF " + str(tha_dough) + " IN CURRENCY  " + currency + " AT " + str(mark_price) + " BOT"
            url = f"https://api.telegram.org/bot{TELE_TOKEN}/sendMessage?chat_id={chat_id}&text={message}"
            url2 = f"https://api.telegram.org/bot{TELE_TOKEN2}/sendMessage?chat_id={chat_id2}&text={message}"
            requests.get(url).json() 
            requests.get(url2).json()
                
    '''except Exception as e:
        print(e)
        message = "bot has stopped cunt"
        url = f"https://api.telegram.org/bot{TELE_TOKEN}/sendMessage?chat_id={chat_id}&text={message}"
        url2 = f"https://api.telegram.org/bot{TELE_TOKEN2}/sendMessage?chat_id={chat_id2}&text={message}"
        requests.get(url).json() 
        requests.get(url2).json()
        sys.exit()'''
    



        

def make_values(value1, value2, value4=0):
    global BREAK_PRICE
    global mark_price
    global ping_pong_count
    global tha_dough
    global currency

    mark_price = 0

    BREAK_PRICE = round(float(value1),1)

    tha_dough = round(float(value2),3)

    currency = value4

    ping_pong_count = int(value4)

    print("BREAK PRICE: " + str(BREAK_PRICE) + " THE AMOUNT INVESTED(BTC/ETH): " + str(tha_dough) )
    #lg.logg(f"BREAK PRICE: {BREAK_PRICE}      THE AMOUNT INVESTED(BTC/ETH): {tha_dough}       THE DIFFERENCE FOR STOP LOSS IS: {diff}")



def choose(mark_price,side):
    global end_price
    global diff
    global stop_limit
    global initial_BP
    global BREAK_PRICE

    if(side == "l"):
        if(mark_price > (BREAK_PRICE + diff)):
            #BREAK_PRICE += diff
            return "long"
        else:
            return "blah"
    elif(side == "s"):
        if(mark_price < (BREAK_PRICE - diff)):
            #BREAK_PRICE -= diff
            return "short"
        else:
            return "blah"
    else:
        return "CHANGE THE BLAH"

def gui():
    #BREAK,AMOUN,PING,currenc,stop_lm
    a5 = str(input("ENTER THE CURRENCY PAIR: ")).upper()
    a2 = round(float(input("ENTER THE TOTAL AMOUNT YOU WANNA INVEST IN BTC: ")),2)
    a7 = int(input("ENTER THE STOP LIMIT DIFFERENCE(in USDT): "))
    a1 = int(input("ENTER THE START PRICE OF THE TRADE: "))
    a3 = int(input("ENTER THE THE NUMBER OF PING-PONGS YOU WANT TO BE REMINDED OF: "))
    main(a1,a2,a3,a5,a7)

gui()

    
