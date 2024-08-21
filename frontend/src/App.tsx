import Navbar from "./Components/Navbar";
import StockRow from "./Components/StockRow";
import nvidia from "./assets/NVIDIA.png";

const App = () => {
  return (
    <>
      <Navbar onLogoClick={() => {}}></Navbar>
      <StockRow
        name="NVIDIA"
        logo={nvidia}
        mentions={100}
        ticker="NVDA"
        comments={10}
        onInteraction={() => {}}
        upvotes={3}
      ></StockRow>
    </>
  );
};

export default App;
