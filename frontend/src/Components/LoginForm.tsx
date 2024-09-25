import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/Form.module.css";
import { useState } from "react";

interface FormValues {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

interface LoginFormProps {
  onLogin: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSubmitLogin: SubmitHandler<FormValues> = async (data) => {
    try {
      setButtonDisabled(true);
      await onLogin({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setButtonDisabled(false);
    } catch (error) {
      console.error(error);
      setButtonDisabled(false);
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
        <div className={`flex flex-col mb-[5px] ${styles.inputWrapper}`}>
          <input
            className={`${styles.formInput} mb-0  justify-center self-center   `}
            {...register("password", { required: true, minLength: 4 })}
            placeholder="Password"
            autoComplete="off"
          />
          <div className={`self-end  text-blue-400 ${styles.forgetPassword}`}>
            Forget Password?
          </div>
        </div>

        <button
          className={`${styles.submitButton}`}
          disabled={buttonDisabled}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
