import { useState } from "react";
import LoginForm from "./LoginForm";
import StyledPopup from "./util/StyledPopup";

interface LoginFormProps {
  onLogin: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<void>;
}

const LoginPopUp = ({ onLogin }: LoginFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="" onClick={() => setIsOpen(true)}>
        Login
      </button>

      {isOpen && (
        <StyledPopup
          className=""
          modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div>
            <div className="flex justify-center items-center">
              <div>Login</div>
            </div>
            <div>
              <LoginForm onLogin={onLogin}></LoginForm>
            </div>
          </div>
        </StyledPopup>
      )}
    </>
  );
};

export default LoginPopUp;
