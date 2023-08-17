import requests
import BTC_price as p

def five_percent(old_spice,currency):
    TELE_TOKEN = ""
    TELE_TOKEN2 = ""
    chat_id = ""
    chat_id2 = ""
    while True:
        mark_price = p.price(currency)
        difference = ((old_spice - mark_price)/old_spice) * 100
        old_spice = mark_price
        if(difference >= 5 or difference <= -5):
            if(difference >= 5):
                message = f"5% OR MORE HAS DROPPED FROM {currency}"
            elif(difference <= -5):
                message = f"5% OR MORE HAS RISEN FROM {currency}"
                
            url = f"https://api.telegram.org/bot{TELE_TOKEN}/sendMessage?chat_id={chat_id}&text={message}"
            url2 = f"https://api.telegram.org/bot{TELE_TOKEN2}/sendMessage?chat_id={chat_id2}&text={message}"
            requests.get(url).json() 
            requests.get(url2).json()
        print("START_PRICE " + str(old_spice) + " AND THE CURRENT PRICE IS: " + str(mark_price))
        

tr = float(input("Enter the current amount or the amount you wanna start from: "))
currency = input("Enter the currency here: ").upper()
five_percent(tr,currency)