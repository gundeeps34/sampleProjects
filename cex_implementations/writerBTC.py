import time

# Define the function to write to the text file
def write_to_file(variable):
    with open('dataBTC.txt', 'a') as file:
        # This is an example of an updating variable. Replace this with your own variable.
        file.write(str(variable) + '\n')
        file.flush()
