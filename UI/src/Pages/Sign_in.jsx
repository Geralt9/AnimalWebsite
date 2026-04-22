import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye, faEyeSlash,
  faCheck, faCircleXmark, faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./SignIn.css";
import { useAuthenticate } from "./AuthenticateContext.jsx";

const API = import.meta.env.VITE_API_URL;

/* Reusable paw-print SVG */
function PawSVG({ className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50"  cy="68" rx="24" ry="20" />
      <ellipse cx="23"  cy="45" rx="11" ry="9"  transform="rotate(-20 23 45)" />
      <ellipse cx="39"  cy="34" rx="11" ry="9"  transform="rotate(-8  39 34)" />
      <ellipse cx="61"  cy="34" rx="11" ry="9"  transform="rotate(8   61 34)" />
      <ellipse cx="77"  cy="45" rx="11" ry="9"  transform="rotate(20  77 45)" />
    </svg>
  );
}

export default function SignIn() {
  const [isLoading, setIsLoading]       = useState(false);
  const [success, setSuccess]           = useState(false);

  const [isFullnameValid, setFullnamevalidation] = useState(false);
  const [isemailValid, setEmailvalidation]       = useState(false);

  const [Password, setPassword]           = useState("");
  const [Fullname, setFullname]           = useState("");
  const [nameStatus, setNameStatus]       = useState(""); // 'valid' | 'invalid' | ''

  const [emailAddress, setEmailAddress]   = useState("");
  const [emailStatus, setEmailStatus]     = useState(""); // 'valid' | 'invalid' | ''

  const [showPassword, setShowpassword]   = useState(false);
  const [PasswordStrength, setPasswordStrength] = useState("");

  const [error, setError] = useState("");

  const { setAuthenticate } = useAuthenticate();

  function showPass(e) {
    e.preventDefault();
    setShowpassword(!showPassword);
  }

  function HandlePasswordStrength(value) {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordStrength(strongRegex.test(value) ? "Strong" : "Weak");
  }

  function HandlePassword(e) {
    const value = e.target.value;
    setPassword(value);
    HandlePasswordStrength(value);
  }

  function HandleName(e) {
    const value = e.target.value;
    setFullname(value);
    const nameTest = /^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/;
    if (nameTest.test(value)) {
      setNameStatus("valid");
      setFullnamevalidation(true);
    } else {
      setNameStatus(value ? "invalid" : "");
      setFullnamevalidation(false);
    }
  }

  function HandleEmail(e) {
    const value = e.target.value;
    setEmailAddress(value);
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailReg.test(value)) {
      setEmailStatus("valid");
      setEmailvalidation(true);
    } else if (value !== "") {
      setEmailStatus("invalid");
      setEmailvalidation(false);
    } else {
      setEmailStatus("");
      setEmailvalidation(false);
    }
  }

  async function Submit(e) {
    e.preventDefault();
    if (isLoading) return;

    if (Password === "" || emailAddress === "" || Fullname === "") {
      return setError("Please fill in all required fields.");
    }
    if (!isemailValid) {
      return setError("Please enter a valid email address.");
    }
    if (!isFullnameValid) {
      return setError("Please enter your full name with a capital letter for each word.");
    }
    if (PasswordStrength === "Weak") {
      return setError("Password too weak — use uppercase, numbers & special characters.");
    }

    setError("");
    setIsLoading(true);

    try {
      const UserData = {
        FullName: Fullname.trim(),
        emailAddress: emailAddress.trim(),
        Password,
      };

      const response = await fetch(`${API}/User/SignUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  /* Password strength bar helper */
  const isStrong = PasswordStrength === "Strong";
  const isWeak   = PasswordStrength === "Weak";

  return (
    <div className="auth-page">

      {/* ── Left panel ── */}
      <div className="auth-panel-left">
        <PawSVG className="auth-paw" />
        <PawSVG className="auth-paw" />
        <PawSVG className="auth-paw" />
        <PawSVG className="auth-paw" />
        <PawSVG className="auth-paw" />

        <div className="auth-brand">
          <PawSVG className="auth-brand-icon" />
          <div className="auth-brand-name">Cat Wiki</div>
          <div className="auth-brand-tagline">Join the community today</div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="auth-panel-right">
        <div className="auth-form-container">

          {success ? (
            <div className="auth-success">
              <div className="auth-success-check">
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <h3>Account created!</h3>
              <p>You&apos;re all set. Log in to get started.</p>
              <a href="/Log_In">Go to Log In</a>
            </div>
          ) : (
            <>
              <div className="auth-title">Create account</div>
              <div className="auth-subtitle">
                Already have an account?{" "}
                <a href="/Log_In">Log in</a>
              </div>

              <form className="auth-form" onSubmit={Submit}>

                {/* Full name */}
                <div className="auth-field">
                  <input
                    id="signup-name"
                    type="text"
                    placeholder=" "
                    value={Fullname}
                    onChange={HandleName}
                  />
                  <label htmlFor="signup-name">Full Name</label>
                  {nameStatus === "valid" && (
                    <span className="auth-field-icon" style={{ color: "#2d6a4f" }}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  )}
                  {nameStatus === "invalid" && (
                    <span className="auth-field-icon" style={{ color: "#e76f51" }}>
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="auth-field">
                  <input
                    id="signup-email"
                    type="email"
                    placeholder=" "
                    value={emailAddress}
                    onChange={HandleEmail}
                  />
                  <label htmlFor="signup-email">Email Address</label>
                  {emailStatus === "valid" && (
                    <span className="auth-field-icon" style={{ color: "#2d6a4f" }}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  )}
                  {emailStatus === "invalid" && (
                    <span className="auth-field-icon" style={{ color: "#e76f51" }}>
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="auth-field">
                  <input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    value={Password}
                    onChange={HandlePassword}
                  />
                  <label htmlFor="signup-password">Password</label>
                  <span className="auth-field-icon clickable" onClick={showPass}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>

                {/* Strength bar */}
                {PasswordStrength && (
                  <div className="auth-strength">
                    <div className="auth-strength-bars">
                      <div className={`auth-strength-bar ${isStrong || isWeak ? (isStrong ? "strong" : "weak") : ""}`} />
                      <div className={`auth-strength-bar ${isStrong ? "strong" : ""}`} />
                      <div className={`auth-strength-bar ${isStrong ? "strong" : ""}`} />
                    </div>
                    <span className={`auth-strength-label ${isStrong ? "strong" : "weak"}`}>
                      {PasswordStrength}
                    </span>
                  </div>
                )}

                <button type="submit" className="auth-submit" disabled={isLoading}>
                  {isLoading ? "Creating account…" : "Sign Up"}
                </button>

                <div className="auth-error">{error}</div>
              </form>
            </>
          )}

        </div>
      </div>

    </div>
  );
}
