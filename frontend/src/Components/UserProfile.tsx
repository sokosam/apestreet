import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import User from "../models/user";
import * as UserApi from "../network/users";

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

  return (
    <>
      <Navbar
        onLogout={onLogout}
        onLogin={onLogin}
        onSignUp={onSignUp}
        user={user}
      ></Navbar>
      <div className="m-auto  w-[70%] h-fit">
        <div>hello</div>
      </div>
    </>
  );
};

export default UserProfile;
