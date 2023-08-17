from nsepy import get_history
from datetime import date, datetime
import os
from tradingview_ta import TA_Handler, Interval, Exchange
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains


os.system("figlet -c Python Trading Bot ")
Today = date.today()
y = Today.strftime("%Y")
m = Today.strftime("%m")
d = Today.strftime("%d")
# d = "30"


###
#driver.find_element_by_xpath("//label[@class='check']/input[@class='word' and @type='text' and @value='hello']").click()
#driver.find_element_by_xpath("//label[@class='check']/input[@class='word' and @type='text' and @value='hello']").clear()
#driver.find_element_by_xpath("//label[@class='check']/input[@class='word' and @type='text' and @value='hello']").send_keys("apple")
#"//button[@class = ‘kn’]/"
###


#last order
last_order="sell"
sold_before = False
bought_before = False
current_price = 0
take_profit = 0.0
take_loss = 0.0

TAKE_PROFIT = 20       # profit target
TAKE_LOSS = 10         # stop loss
BREAK_PRICE = 2075     # price the algo triggers at 
life = True            # timer bool for now
ETH = "0.1"

#load chrome driver 
#s=Service(ChromeDriverManager().install())
#driver = webdriver.Chrome(service=s)

#brave_path = "C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
path = "C:/Program Files/Google/Chrome/Application/chrome.exe"
option = webdriver.ChromeOptions()
option.binary_location = path
option.add_argument("--start-maximized")
option.add_argument("--disable-blink-features=AutomationControlled")
option.add_experimental_option("useAutomationExtension", False)
option.add_argument("--disable-plugins-discovery")
option.add_argument(r"--user-data-dir=C:/Users/gunde/AppData/Local/Google/Chrome/User Data")
option.add_argument("--profile-directory=Person 2")
driver = webdriver.Chrome(executable_path="Users/gunde/Downloads/chrome_driver_chrome/chromedriver.exe", options=option)
# option.add_argument("--incognito") OPTIONAL
# option.add_argument("--headless") OPTIONAL
driver.get("https://www.deribit.com/futures/ETH-PERPETUAL")
driver.maximize_window()


time.sleep(15)


#initiating tradingview handler 
ssw = TA_Handler(
    symbol="ETHUSD.P",
    screener="crypto",
    exchange="DERIBIT",
    interval=Interval.INTERVAL_5_MINUTES
)
def countdown(t):

    while t:
        mins, secs = divmod(t, 60)
        timer = '{:02d}:{:02d}'.format(mins, secs)
        print(timer, end="\r")
        time.sleep(1)
        t -= 1


while True:
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S")
    if(current_time >= "09:30:00" or current_time < "15:10:00"):

        rec = ssw.get_analysis()

        m = driver.find_element(By.XPATH,"//*[@id=\"mainHeader\"]/header/div/div[2]/div[1]/div/button")     #clicks on futures button
        a = ActionChains(driver)
        a.move_to_element(m).perform()

        driver.find_element(By.XPATH,"//*[@id=\"futuresTabPanel-0\"]/div/div[2]/div[1]/div[2]/div/button[3]/span[1]").click()  #clicks on latest date
        

        m = driver.find_element(By.XPATH,"//*[@id=\"AccountSummary-default\"]/div[2]/div/div/div/div/div[2]/div[2]/div[1]/div[2]/div/div/div[1]/div[3]/div/div/span[1]")    #bullshit button
        a.move_to_element(m).perform()

        time.sleep(5)
        print("1243")
        #current_price =
        driver.find_element(By.XPATH,"//html/body/div[1]/div[3]/div[2]")   #finds price22

        driver.find_element(By.XPATH,"//*[@id=\"OrderForm-default\"]/div[2]/div/div[1]/button[2]").click()  #market button
        driver.find_element(By.XPATH,"/html/body/div[4]/div[3]/ul/li[1]").click()  # drop down market button
        driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").click()    # eth button
        driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").clear()    # eth button
        driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").send_keys(ETH)    # eth button
        
        if (current_price >= BREAK_PRICE):
            print("Buying 1 stock of ETH")
            last_order="buy"
            print(last_order)
            print(sold_before)
            #buy 1 stock of ETH
            driver.find_element(By.XPATH,"//*[@id=\"OrderForm-default\"]/div[2]/div/div[5]/button[1]").click()     #buy button
            current_price = driver.find_element(By.XPATH,"//*[@id=\"instrument-bar-header\"]/div[1]/span[3]").text
            print(current_price)
            take_profit = float(current_price) + TAKE_PROFIT
            take_loss = float(current_price) - TAKE_LOSS
            while True:
                print("Time left till next call - ")
                countdown(int(2))
                rec = ssw.get_analysis()
                current_price = driver.find_element(By.XPATH,"//*[@id=\"instrument-bar-header\"]/div[1]/span[3]").text
                if(float(current_price) < (BREAK_PRICE - 0.1)):
                    #sell the stock
                    print("Selling 1 stock of SONATSOFTW")
                    last_order="sell"
                    print(last_order)
                    #sell 1 stock of ETH 
                    driver.find_element(By.XPATH,"//*[@id=\"OrderForm-default\"]/div[2]/div/div[1]/button[2]").click()  #market button
                    driver.find_element(By.XPATH,"/html/body/div[4]/div[3]/ul/li[1]").click()  # drop down market button
                    driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").click()    # eth button
                    driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").clear()    # eth button
                    driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").send_keys(ETH)    # eth button
                    driver.find_element(By.XPATH,"//*[@id=\"OrderForm-default\"]/div[2]/div/div[5]/button[2]").click()     #sell button
                    break
                else:
                    print("no adjustment required")

        '''elif (current_price <= BREAK_PRICE):
            print("selling stock of ETH")
            driver.find_element(By.XPATH,"//*[@id=\"OrderForm-default\"]/div[2]/div/div[1]/button[2]").click()  #market button
            driver.find_element(By.XPATH,"/html/body/div[4]/div[3]/ul/li[1]").click()  # drop down market button
            driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").click()    # eth button
            driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").clear()    # eth button
            driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").send_keys(ETH)    # eth button
            driver.find_element(By.XPATH,"//*[@id=\"OrderForm-default\"]/div[2]/div/div[5]/button[2]").click()     #sell button
            current_price = driver.find_element(By.XPATH,"//*[@id=\"instrument-bar-header\"]/div[1]/span[3]").text
            print(current_price)
            take_profit = float(current_price) - TAKE_PROFIT
            take_loss = float(current_price) + TAKE_LOSS
            while True:
                print("Time left till next call - ")
                countdown(int(2))
                rec = ssw.get_analysis()
                current_price = driver.find_element(By.XPATH,"//*[@id=\"instrument-bar-header\"]/div[1]/span[3]").text
                if(float(current_price) > (BREAK_PRICE + 0.1)):
                    #buy the stock
                    print("Buying the stock")
                    driver.find_element(By.XPATH,"//*[@id=\"OrderForm-default\"]/div[2]/div/div[1]/button[2]").click()  #market button
                    driver.find_element(By.XPATH,"/html/body/div[4]/div[3]/ul/li[1]").click()  # drop down market button
                    driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").click()    # eth button
                    driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").clear()    # eth button
                    driver.find_element(By.XPATH,"//*[@id=\"amountInput2\"]").send_keys(ETH)    # eth button
                    driver.find_element(By.XPATH,"//*[@id=\"OrderForm-default\"]/div[2]/div/div[5]/button[1]").click()     #buy button
                    break
                else:
                    print("no adjustment required")'''
          
    elif(current_time >= "15:10:00" and life == False):
        print("Time to close for the day")
        # #fetch open profit
        #open_profit = driver.find_element(By.XPATH,"//div[4]/div[1]/div[1]/div[1]/div[2]/div[3]/div[1]").text
        # print(open_profit)
        # P = "1000"
        print("Calculating profit :",open_profit)
        break
    else:
        if(current_time >= "09:15:00" and current_time < "09:30:00"):
            print("Analysing market","\n\n")
        elif(current_time < "9:15:00"):
            print("Waiting for market to open")
        else:
            print("No action required")
        
    
    


