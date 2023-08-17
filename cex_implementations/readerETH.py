import time

def price():
    with open('dataETH.txt', 'r') as file:
        lines = file.readlines()
        try:
            last_line = lines[-1].strip()
        except:
            time.sleep(5)
            lines = file.readlines()
            last_line = lines[-1].strip()
        return float(last_line)
