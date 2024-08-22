import React from "react";
import Navbar from "./Components/Navbar";
import StockRow from "./Components/StockRow";
import StockList from "./Components/StockList";
import nvidia from "./assets/NVIDIA.png";
// import { useState } from "react";
// import Stock from "./models/stock";

const App = () => {
  // const [stocks, setStocks] = useState<Stock[]>([]);
  // console.log(stocks);
  // setStocks([]);

  return (
    <>
      <Navbar onLogoClick={() => {}}></Navbar>
      <div className="w-6/12 h-fit">
        <StockList title="test title">
          <StockRow
            name="NVIDIA"
            logo={nvidia}
            mentions={999999}
            ticker="NVDA"
            comments={10}
            onInteraction={() => {}}
            upvotes={3}
          ></StockRow>
          <StockRow
            name="NVIDIA"
            logo={nvidia}
            mentions={100}
            ticker="NVDA"
            comments={10}
            onInteraction={() => {}}
            upvotes={3}
          ></StockRow>
        </StockList>
      </div>
    </>
  );
};

export default App;
