from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import time, threading
from os import environ as env
import redis

load_dotenv()


app = FastAPI(async_mode='asgi')
r = redis.Redis(host='localhost', port=6379)


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





class Stock(BaseModel):
    ticker : str 

@app.post("/stock")
async def getStock(stock: Stock):
    if stock.ticker.upper() in stock_list:
        return stock_list[stock.ticker.upper()]
    else:
        raise HTTPException(404, "Stock not found")

def get_updated_stock_list():
    # Retrieve updated_stock_list from Redis
    data = r.get('updated_stock_list')
    if data:
        return json.loads(data)
    return {}

@app.post("/stock/mentions")
async def getMentions(stock: Stock):
    try:
        updated_stock_list = get_updated_stock_list()
    except Exception as e:
        print(e)

    if stock.ticker.upper() in updated_stock_list:
        return updated_stock_list[stock.ticker.upper()]
    else:
        raise HTTPException(404, "Stock not found")





def start_uvicorn():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    start_uvicorn()