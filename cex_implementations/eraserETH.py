filename = 'dataETH.txt'
num_lines_to_keep = 10

with open(filename, 'r') as f:
    lines = f.readlines()

if len(lines) > num_lines_to_keep:
    lines = lines[-num_lines_to_keep:]

with open(filename, 'w') as f:
    f.writelines(lines)
