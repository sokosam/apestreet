from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import time, threading
from os import environ as env

load_dotenv()


app = FastAPI(async_mode='asgi')

origins = [
    "http://localhost:5173",
    "http://localhost:5000/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


stock_list ={}
with open(r"company_tickers.json", "r") as file:
    data = json.load(file)
    for i in data:
        stock_list[data[i]["ticker"]] = data[i]["title"]

updated_stock_list ={}
with open(r"company_tickers.json", "r") as file:
    data = json.load(file)
    for i in data:
        stock_list[data[i]["ticker"].upper()] = 0  

from timeloop import Timeloop
from datetime import timedelta
import praw

tl = Timeloop()

@tl.job(interval=timedelta(seconds=600))
def updateStocks():
    reddit = praw.Reddit(client_id=env["client_id"], client_secret=env['client_secret'], user_agent=env['user_agent'])
    print("ran again")
    sub = reddit.subreddit("wallstreetbets")
    for submission in sub.new(limit=5):
        for word in submission.selftext.split():
            if len(word) > 1 and  (word  in stock_list ):
                stock_list[word] += 1  



class Stock(BaseModel):
    ticker : str 

@app.post("/stock")
async def getStock(stock: Stock):
    if stock.ticker.upper() in stock_list:
        return stock_list[stock.ticker.upper()]
    else:
        raise HTTPException(404, "Stock not found")

@app.post("/stock/mentions")
async def getMentions(stock: Stock):
    if stock.ticker.upper() in updated_stock_list:
        return updated_stock_list[stock.ticker.upper()]
    else:
        raise HTTPException(404, "Stock not found")

def start_tl():
    tl.start(block=True)

def start_uvicorn():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

import concurrent.futures
if __name__ == "__main__":
    start_uvicorn