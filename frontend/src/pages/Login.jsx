import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  if (email && password) {
    localStorage.setItem("isLoggedIn", "true");

    navigate("/dashboard");
  } else {
    alert("Please enter email and password");
  }
};

  return (
    <div className="login-page">

      {/* Left Section */}
      <div className="login-brand">

        <div className="brand-logo">
          <div className="brand-icon">Q</div>
          <span>QuoteFlow</span>
        </div>

        <div className="brand-content">
          <h1>
            Manage your quotations
            <br />
            <span>smarter & faster.</span>
          </h1>

          <p>
            Create, manage and track your business quotations
            from one simple platform.
          </p>

          <div className="brand-features">
            <div>
              <span>✓</span>
              Easy quotation management
            </div>

            <div>
              <span>✓</span>
              Track quotation status
            </div>

            <div>
              <span>✓</span>
              Fast and organized workflow
            </div>
          </div>
        </div>

        <div className="brand-footer">
          © 2026 QuoteFlow. All rights reserved.
        </div>

      </div>


      {/* Right Section */}
      <div className="login-section">

        <div className="login-card">

          <div className="login-header">
            <h2>Welcome back</h2>

            <p>
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div className="form-group">
              <div className="password-label">
                <label>Password</label>

                <a href="#forgot">
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>


            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">
                Remember me
              </label>
            </div>


            <button
              type="submit"
              className="login-button"
            >
              Sign In
            </button>

          </form>

          <div className="login-footer">
            <p>
              Don't have an account?
              <span> Contact administrator</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;