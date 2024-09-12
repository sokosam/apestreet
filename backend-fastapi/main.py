from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

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

class Stock(BaseModel):
    ticker : str 

@app.post("/stock")
async def getStock(stock: Stock):
    if stock.ticker.upper() in stock_list:
        return stock_list[stock.ticker.upper()]
    else:
        raise HTTPException(404, "Stock not found")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)
