import { useForm } from "react-hook-form";
import styles from "../styles/SignUpForm.module.css";

const SignUpForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="bg-inherit"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <div className="flex flex-col items-center bg-inherit">
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
        <input
          className={styles.formInput}
          {...register("passwordConfirm", {
            required: true,
            minLength: 4,
          })}
          placeholder="Confirm Password"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
