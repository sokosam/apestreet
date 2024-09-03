import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/SignUpForm.module.css";
import { useState } from "react";
import * as UserApi from "../network/users";

interface FormValues {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

const SignUpForm = () => {
  const [emailVerification, setEmailVerification] = useState<boolean>(false);
  const { register, watch, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await UserApi.signUpUser({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    console.log(response);
    if (response) {
      setEmailVerification(true);
    }
  };

  return (
    <form className="bg-inherit" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center bg-inherit content">
        {!emailVerification && (
          <>
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
            <input
              className={styles.formInput}
              {...register("password", { required: true, minLength: 4 })}
              placeholder="Password"
            />
            <div className="flex flex-col mb-[5px] ">
              <input
                className={`${styles.formInput} `}
                {...register("password_confirm", {
                  required: true,
                  minLength: 4,
                  validate: (val: string) => {
                    if (val != watch("password")) {
                      return "Passwords do not match!";
                    }
                  },
                })}
                placeholder="Confirm Password"
              />
              {/* <div className="self-end text-xs text-blue-400">
                Forget Password?
              </div> */}
            </div>

            <button className={`${styles.submitButton} my-1 `} type="submit">
              Submit
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
