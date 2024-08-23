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
      <div className="w-[100%] sm:w-[90%] md:w-[80:%] xl:w-[50%] m-auto">
        <StockList>
          <StockRow
            name="sdadasasdadasasdas"
            logo={nvidia}
            mentions={1}
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
          <StockRow
            name="NVIDIA"
            logo={nvidia}
            mentions={100}
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
          <td></td>
        </StockList>
      </div>
    </>
  );
};

export default App;
