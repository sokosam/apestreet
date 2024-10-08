import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "../styles/Form.module.css";

interface FormValues {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

interface SignUpFormProps {
  onSignUp: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const SignUpForm = ({ onSignUp }: SignUpFormProps) => {
  const [emailVerification, setEmailVerification] = useState<boolean>(false);
  const { register, watch, handleSubmit } = useForm<FormValues>();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setButtonDisabled(true);
      await onSignUp({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setEmailVerification(true);
      setButtonDisabled(false);
    } catch (error) {
      console.error(error);
      setButtonDisabled(false);
    }
  };

  return (
    <form className="bg-inherit" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center bg-inherit content">
        <input className="opacity-0 size-0 " type="text" />
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
            <div className={`flex flex-col mb-[5px] ${styles.inputWrapper}  `}>
              <input
                className={`${styles.formInput}  self-center `}
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

            <button
              disabled={buttonDisabled}
              className={`${styles.submitButton} `}
              type="submit"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
