import json

table = {}

with open(r"company_tickers.json", "r") as file:
    data = json.load(file)
    for i in data:
        # print(i)
        table[data[i]["ticker"]] = data[i]["title"]

