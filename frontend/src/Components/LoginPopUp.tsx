import StyledPopup from "./util/StyledPopup";
import LoginForm from "./LoginForm";
import { useState } from "react";

const LoginPopUp = () => {
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
              <LoginForm></LoginForm>
            </div>
          </div>
        </StyledPopup>
      )}
    </>
  );
};

export default LoginPopUp;
