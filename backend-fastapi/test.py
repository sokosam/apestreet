# import json

# table = {}

# with open(r"company_tickers.json", "r") as file:
#     data = json.load(file)
#     for i in data:
#         # print(i)
#         table[data[i]["ticker"]] = data[i]["title"]

import praw
import pprint
import json

# stock_list =set()
# with open(r"company_tickers.json", "r") as file:
#     data = json.load(file)
#     for i in data:
#         stock_list.add(data[i]["ticker"].upper()) 


# reddit = praw.Reddit(client_id="RLCIr6zkr3R1jmsiblBq-g", client_secret="tHHz55olEVMyL3oUNOe3Guxn4JNLpw", user_agent="Scrapper")

# sub = reddit.subreddit("wallstreetbets")
# for submission in sub.new(limit=100):
#     print(submission.selftext)

# sub = reddit.submission(id="1epnmkn")
# pprint.pprint(vars(sub))
# print(sub.link_flair_text)
# print(sub._fetched)

# cnt = 0
# for i in sub.selftext.split():
#     if len(i) > 1 and  (i  in stock_list or i[1:] in stock_list):
#         print(i)
#         cnt+=1
    # elif i.lower() in stock_list:
    #     print(i)
    #     cnt+=1



# print(sub.selftext)
# pprint.pprint(vars(sub))



# print(reddit.auth.limits)

import pickle
import redis
from timeloop import Timeloop
from datetime import timedelta
import praw
from dotenv import load_dotenv
from os import environ as env

load_dotenv()

r = redis.Redis(host='localhost', port=6379)

tl = Timeloop()

updated_stock_list ={}
with open(r"company_tickers.json", "r") as file:
    data = json.load(file)
    for i in data:
        updated_stock_list[data[i]["ticker"].upper()] = 0  

@tl.job(interval=timedelta(seconds=5))
def updateStocks():
    reddit = praw.Reddit(client_id=env["client_id"], client_secret=env['client_secret'], user_agent=env['user_agent'])
    print("ran again")
    sub = reddit.subreddit("wallstreetbets")
    for submission in sub.new(limit=100):
        for word in submission.selftext.split():
            if len(word) > 1 and  (word.upper()  in updated_stock_list ):
                updated_stock_list[word.upper()] += 1  
    r.set('updated_stock_list', json.dumps(updated_stock_list))
    
    x= get_updated_stock_list()
    for i in x:
        if x[i] > 0:
            print(i, " ", x[i])

def get_updated_stock_list():
    # Retrieve updated_stock_list from Redis
    data = r.get('updated_stock_list')
    if data:
        return json.loads(data)
    return {}

if __name__ == "__main__":
    # Start the timeloop
    tl.start(block=True)