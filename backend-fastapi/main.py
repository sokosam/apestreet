from yahooquery import Ticker
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json

app = FastAPI(async_mode='asgi')

class Stock(BaseModel):
    stock : str

# @app.post("/stock")
# async def root():
#     stock = {ticker :"aapl"}
#     stock_info = await Ticker(stock.stock)
#     if len(stock_info) <=1:
#         print(stock_info.all_modules)
#     return stock_info[stock.ticker]["shortName"].json()   

@app.post("/stock")
async def getStock(stock: Stock):
    stock_info = Ticker(stock.stock)
    try:
        if stock_info.price[stock.stock]["shortName"]:
            return stock_info.price[stock.stock]["shortName"]
    except:
        raise HTTPException(status_code=404, detail="Item not found")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app , )
