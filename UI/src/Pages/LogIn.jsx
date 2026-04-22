import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import "./SignIn.css";
import { useAuthenticate } from "./AuthenticateContext.jsx";

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

export default function Login() {
  const {
    Submit,
    showPass,
    Password,
    setPassword,
    error,
    emailAddress,
    setEmail,
    success,
    isLoading,
    showPassword,
  } = useAuthenticate();

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
          <div className="auth-brand-tagline">A community for animal lovers</div>
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
              <h3>Welcome back!</h3>
              <p>You&apos;ve logged in successfully.</p>
              <a href="/">Back to home</a>
            </div>
          ) : (
            <>
              <div className="auth-title">Welcome back</div>
              <div className="auth-subtitle">
                Don&apos;t have an account?{" "}
                <a href="/Sign_Up">Create one</a>
              </div>

              <form className="auth-form" onSubmit={Submit}>

                {/* Email */}
                <div className="auth-field">
                  <input
                    id="login-email"
                    type="email"
                    placeholder=" "
                    value={emailAddress}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="login-email">Email Address</label>
                </div>

                {/* Password */}
                <div className="auth-field">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder=" "
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="login-password">Password</label>
                  <span className="auth-field-icon clickable" onClick={showPass}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>

                <button type="submit" className="auth-submit" disabled={isLoading}>
                  {isLoading ? "Logging in…" : "Log In"}
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
