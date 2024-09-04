import StyledPopup from "./util/StyledPopup";
import LoginForm from "./LoginForm";

const LoginPopUp = () => {
  return (
    <StyledPopup
      className=""
      trigger={<button className="">Login</button>}
      modal
    >
      <div>
        <div className="flex justify-center items-center">
          <div>Login</div>
        </div>
        <div>
          <LoginForm></LoginForm>
        </div>
      </div>
    </StyledPopup>
  );
};

export default LoginPopUp;
