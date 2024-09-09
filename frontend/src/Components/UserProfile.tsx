import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import User from "../models/user";
import * as UserApi from "../network/users";
import * as StockApi from "../network/userStocks";
import { useParams } from "react-router-dom";
import StockList from "./StockList";
import StockRow from "./StockRow";

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

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
      console.log(error);
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
      console.log(error);
    }
  };
  const { id } = useParams<{ id: string }>();
  const [profileStockList, setProfileStockList] = useState<
    { id: number; user_id: number; stock_symbol: string; created_at: string }[]
  >([]);

  useEffect(() => {
    const profile = async () => {
      const searched_username = id;
      console.log(searched_username);

      const profile_user = await UserApi.getPublicUser(
        searched_username
          ? searched_username
          : user
          ? user.username
          : "samuelshi"
      );

      console.log(profile_user);

      if (profile_user.exists) {
        const profile_user_watchlist = await StockApi.getUserStocksPublic(
          searched_username!
        );
        setProfileStockList(profile_user_watchlist);
        console.log("hello" + profile_user_watchlist);
      } else {
        console.log("nope");
      }
    };
    profile();
  }, [id, user]);

  return (
    <>
      <Navbar
        onLogout={onLogout}
        onLogin={onLogin}
        onSignUp={onSignUp}
        user={user}
      ></Navbar>
      <div className="m-auto  w-[70%] h-fit">
        <div className="w-[100%] xl:w-[60%] m-auto">
          <StockList>
            {profileStockList &&
              profileStockList.map((stock) => (
                <StockRow
                  key={(+new Date() * Math.random())
                    .toString(36)
                    .substring(0, 6)}
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
      </div>
    </>
  );
};

export default UserProfile;
