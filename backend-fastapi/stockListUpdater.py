import redis
from timeloop import Timeloop
from datetime import timedelta
import praw
from dotenv import load_dotenv
from os import environ as env
import json

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
            if len(word) > 1 and  (word  in updated_stock_list ):
                updated_stock_list[word] += 1  
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
    tl.start(block=True)

