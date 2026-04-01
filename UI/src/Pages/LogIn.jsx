import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./SignIn.css";
import { useAuthenticate } from "./AuthenticateContext.jsx";

export default function Login() {
  const {
    Submit,
    showPass,
    Password,
    SetPassword,
    error,
    emailAddress,
    setEmail,
    success,
    isLoading,
    showPassword,
    UserId,
  } = useAuthenticate();

  useEffect(() => {
    if (UserId) {
      localStorage.setItem("UserId", UserId);
      console.log(UserId);
    } else {
      localStorage.removeItem("UserId");
    }
  }, [UserId]);

  useEffect(() => {
    document.body.style.backgroundImage =
      "url('../Icons_Images/Scene-24.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
      document.body.style.minHeight = "";
      document.body.style.margin = "";
    };
  }, []);

  return (
    <>
      {success ? (
        <div className="Success">
          Success <FontAwesomeIcon icon={faCircleCheck} />
          <a href="/" rel="noopener noreferrer">
            Back to the main Page
          </a>
        </div>
      ) : (
        <>
          <div className="Title">Log In</div>

          <form className="Form" onSubmit={Submit}>
            <label>Email Address :</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={emailAddress}
            />

            <label className="Pass_Label">Password :</label>

            <div className="password_wrapper">
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => SetPassword(e.target.value)}
                value={Password}
              />

              <div className="eye_show" onClick={showPass}>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </div>
            </div>

            <button type="submit" className="Submit" disabled={isLoading}>
              {isLoading ? "Logging In..." : "Log In"}
            </button>

            <div className="LogInLink">
              Don&apos;t have an account?{" "}
              <a href="/Sign_Up" rel="noopener noreferrer">
                Register
              </a>
            </div>

            <div className="ErrorBox">{error}</div>
          </form>
        </>
      )}
    </>
  );
}