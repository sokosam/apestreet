import logo from "../assets/monki.jpg";
// import styles from "../styles/Navbar.module.css";
import SignUpPopUp from "./SignUpPopUp";
import LoginPopUp from "./LoginPopUp";
import * as UserApi from "../network/users";
import { useState } from "react";
import User from "../models/user";

interface NavbarProps {
  onLogoClick: () => void;
  user: User | null;
}

const Navbar = ({ onLogoClick, user }: NavbarProps) => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(user != null);

  const onLogout = async () => {
    await UserApi.logout();
    setUserLoggedIn(false);
  };

  return (
    <>
      <nav className="min-h-16 max-h-32  flex">
        <div
          className={`p-4 max-w-screen-xl min-w-fit py-5 flex flex-wrap-reverse justify-between align-middle`}
        >
          <a className="h-full  flex space-x-3 rtl:space-x-reverse" href="/">
            <img
              className={` h-full`}
              onClick={onLogoClick}
              src={logo}
              alt=""
            />
            <p
              className={` self-center px-2 text-xl whitespace-nowrap text-black `}
            >
              Apestreet
            </p>
          </a>
          <div className=" hidden md:block justify-between md:w-auto align-middle"></div>
        </div>
        <div className={`grow-[1] flex items-center justify-end space-x-5 `}>
          {user ? (
            <>
              <div className="w-fit pr-[20px]">
                <button
                  onClick={onLogout}
                  className="self-center cursor-pointer"
                >
                  Logout
                </button>
              </div>
              <div className="w-fit pr-[40px]">{user.username}</div>
            </>
          ) : (
            <>
              <div className="border-1 rounded-md ">
                <SignUpPopUp></SignUpPopUp>
              </div>

              <div className="w-20">
                <LoginPopUp></LoginPopUp>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
