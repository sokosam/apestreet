import Navbar from "./Components/Navbar";
import StockList from "./Components/StockList";
import StockRow from "./Components/StockRow";
import nvidia from "./assets/NVDA.png";
// import { useState } from "react";
// import Stock from "./models/stock";

const App = () => {
  // const [stocks, setStocks] = useState<Stock[]>([]);

  return (
    <>
      <Navbar onLogoClick={() => {}}></Navbar>
      <div className="w-[100%] xl:w-[60%] m-auto">
        <StockList>
          <StockRow
            name="asasaaaaaaaaaaaaaaaaaaaaaaaaaaasasas"
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
            logo="dssd"
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
            fire={true}
            comments={10}
            onInteraction={() => {}}
            upvotes={3}
          ></StockRow>
          <StockRow
            name="NVIDIA"
            logo={nvidia}
            mentions={100}
            ticker="NVDA"
            fire={true}
            comments={10}
            onInteraction={() => {}}
            upvotes={3}
          ></StockRow>
          <StockRow
            name="NVIDIA"
            logo={nvidia}
            mentions={100}
            ticker="NVDA"
            fire={true}
            comments={10}
            onInteraction={() => {}}
            upvotes={3}
          ></StockRow>
          <StockRow
            name="NVIDIA"
            logo={nvidia}
            mentions={100}
            ticker="NVDA"
            fire={true}
            comments={10}
            onInteraction={() => {}}
            upvotes={3}
          ></StockRow>
          <StockRow
            name="kimstock"
            logo={nvidia}
            mentions={100}
            ticker="KIM"
            fire={true}
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
