import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as UserApi from "../network/users";
import styles from "../styles/Form.module.css";

interface FormValues {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

const LoginForm = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmitLogin: SubmitHandler<FormValues> = async (data) => {
    const response = await UserApi.loginUser({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    console.log(response);
    if (response) {
      setLoggedIn(true);
    }
  };

  return (
    <form className="bg-inherit" onSubmit={handleSubmit(onSubmitLogin)}>
      <div className="flex flex-col items-center bg-inherit content">
        <input className="opacity-0 size-0 " type="text" />
        <input
          className={styles.formInput}
          {...register("username", { required: true, minLength: 4 })}
          placeholder="Username"
        />
        <input
          className={styles.formInput}
          {...register("email", { required: true, minLength: 4 })}
          placeholder="Email"
        />
        <div className="flex flex-col mb-[5px] ">
          <input
            className={`${styles.formInput} mb-0    `}
            {...register("password", { required: true, minLength: 4 })}
            placeholder="Password"
          />
          <div className="self-end text-xs text-blue-400">Forget Password?</div>
        </div>

        <button className={`${styles.submitButton} my-1 `} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
