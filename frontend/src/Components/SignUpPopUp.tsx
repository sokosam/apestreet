// import "reactjs-popup/dist/index.css";
import StyledPopup from "./util/StyledPopup";
import SignUpForm from "./SignUpForm";

const SignUpPopUp = () => {
  return (
    <StyledPopup
      className=""
      trigger={<button className="">Sign Up</button>}
      modal
    >
      <div>
        <div className="flex justify-center items-center">
          <div>Create Account</div>
        </div>
        <div>
          <SignUpForm></SignUpForm>
        </div>
      </div>
    </StyledPopup>
  );
};

export default SignUpPopUp;
