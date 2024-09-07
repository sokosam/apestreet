// import "reactjs-popup/dist/index.css";
import StyledPopup from "./util/StyledPopup";
import SignUpForm from "./SignUpForm";

interface SignUpPopUpProps {
  onSignUp: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const SignUpPopUp = ({ onSignUp }: SignUpPopUpProps) => {
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
          <SignUpForm onSignUp={onSignUp}></SignUpForm>
        </div>
      </div>
    </StyledPopup>
  );
};

export default SignUpPopUp;
