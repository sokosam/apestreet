import { useEffect, useState } from "react";
import img from "../assets/monki.jpg";
import * as UserApi from "../network/users";
import styles from "../styles/UserProfile.module.css";

interface UserProfileTagProps {
  id: string;
}

const UserProfileTag = ({ id }: UserProfileTagProps) => {
  const [description, setDescription] = useState("It's empty here!");

  useEffect(() => {
    const getDesc = async (id: string) => {
      const desc = await UserApi.getUserDescription(id);
      console.log(desc.description);

      setDescription(desc.description);
    };
    getDesc(id);
  }, [id]);

  return (
    <div
      className={` w-full lg:min-w-0 mb-2 lg:mb-0 lg:w-[25%] ${styles.bg} shadow-2xl border-2 border-opacity-5 rounded-[25px] self-center box-border flex justify-start`}
    >
      <div className="self-center min-w-fit w-fit h-[40%] box-border ">
        <img className="size-10 m-2 border-2 rounded-[50%] " src={img} alt="" />
      </div>
      <div className="self-center w-full">{id}</div>
      <div>{description}</div>
    </div>
  );
};
export default UserProfileTag;
