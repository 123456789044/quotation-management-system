import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        alert("Account created successfully");
        navigate("/login");
      } else {
        const message = await response.text();
        alert(message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="login-page">

      <div className="login-brand">

        <div className="brand-logo">
          <div className="brand-icon">Q</div>
          <span>QuoteFlow</span>
        </div>

        <div className="brand-content">
          <h1>
            Start managing your
            <br />
            <span>quotations today.</span>
          </h1>

          <p>
            Create your QuoteFlow account and manage
            your business quotations easily.
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

      <div className="login-section">

        <div className="login-card">

          <div className="login-header">
            <h2>Create an account</h2>

            <p>
              Register to start using QuoteFlow
            </p>
          </div>

          <form onSubmit={handleRegister}>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Create Account
            </button>

          </form>

          <div className="login-footer">
            <p>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;