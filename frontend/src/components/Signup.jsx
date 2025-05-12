import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api";
import styled from "styled-components";


const Split = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
height: 100vh;
width: 100%;
padding: 0;

@media (max-width: 800px) {
  grid-template-columns: 1fr;
}

h2{
  margin-bottom: 30px;
  text-align: center;
}

.welcome {
  background-color: #89ac46;
  color: #fff5e4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  height: 100vh;
  width: 100%;

  .welcome-header {
    font-size: 3rem;
    font-weight: bold;
  }

  .signup-request {
    font-size: 1.3rem;
    display: block;
    color: #123524;

    .signup-button {
      display: block;
      color: #fff5e4;
      background-color: transparent;
      border-radius: 40px;
      margin: 10px auto;
      text-decoration: none;
      transition: all 0.3s ease;
      border: 2px solid #fff5e4;
      padding: 8px 24px;
      width: fit-content;
      height: fit-content;
      cursor: pointer
      font-weight: bold;  
    }

    .signup-button: hover {
    color: #123524;
      background-color: #fff5e4;
      box-shadow: 0 1px 10px #fff5e4;
      border: 0.5px solid #fff5e4;
    }
  }

  @media (max-width: 800px) {
    display: none;
  }
}

.auth-section {
  background-color: #EEEEEE;
  display: flex;
  justify-content: center;
}

.auth-component {
  background-color: #fff;
  width: auto;
  padding: 30px;
  margin: auto;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.2);
  border-radius: 20px;

  .signup-request {
    @media (min-width: 800px) {
      display: none;
    }
  }
}

  
  .form-group {
    margin-bottom: 15px;
  }


   
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
`;
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Attempting signup...");
      const response = await signup({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      console.log("Signup successful:", response);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      window.location.href = "/landing";
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Split>
      <div className="welcome">
        <p className="welcome-header">Create a new account</p>
        <p className="signup-request">
          Already have an account ?{" "}
          <Link to="/login" className="signup-button">
            Log in
          </Link>
        </p>
      </div>

      <div className="auth-section">
        <div className="auth-component">
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <p className="signup-request">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </Split>
  );
}

export default Signup;
