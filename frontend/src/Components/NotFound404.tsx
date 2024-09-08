import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import User from "../models/user";
import * as UserApi from "../network/users";

const NotFound404 = () => {
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

  const link_user = user ? user.username : "poop";

  return (
    <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0 m-auto flex items-center justify-center">
      <div className="w-3/4 h-3/5 flex items-center justify-center">
        <div className="h-3/4">
          <h1 className="text-3xl">Page Not Found!</h1>
          <hr className="mt-1 border-slate-400" />
          <div className="flex flex-row justify-evenly ">
            <Link to="/">Home</Link>
            <Link to={`/user/${link_user}`}>Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
