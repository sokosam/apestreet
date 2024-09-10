import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import StockList from "./StockList";
import StockRow from "./StockRow";
// import nvidia from "./assets/NVDA.png";
// import { useState } from "react";
// import Stock from "./models/stock";
import User from "../models/user";
import * as UserApi from "../network/users";
import * as StockApi from "../network/userStocks";

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [stocks, setStocks] = useState<
    { id: number; user_id: number; stock_symbol: string; created_at: string }[]
  >([]);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user: User = await UserApi.getLoggedInUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchUserStocks = async () => {
      try {
        const stocks = await StockApi.getUserStocks();
        setStocks(stocks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserStocks();
  }, []);

  const onLogout = async () => {
    await UserApi.logout();
    setUser(null);
  };

  const onLogin = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const user = await UserApi.loginUser(data);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  const onSignUp = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const user = await UserApi.signUpUser(data);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar
        onLogout={onLogout}
        onLogin={onLogin}
        onSignUp={onSignUp}
        user={user}
      ></Navbar>
      <div className="w-[100%] xl:w-[60%] m-auto">
        <StockList>
          {stocks &&
            stocks.map((stock) => (
              <StockRow
                key={(+new Date() * Math.random()).toString(36).substring(0, 6)}
                name={stock.stock_symbol}
                mentions={1}
                ticker={stock.stock_symbol}
                comments={1}
                onInteraction={() => {}}
                upvotes={0}
              ></StockRow>
            ))}

          <td></td>
        </StockList>
      </div>
    </>
  );
};

export default HomePage;
