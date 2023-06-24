import React, { useState } from "react";
import "./login.scss";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../api/api";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const userCredentials = Object.fromEntries(formData);
    setError("");
    setLoading(true);
    api
      .post(`/accounts/login`, userCredentials)
      .then((response) => {
        let token = response.data.token;
        localStorage.setItem("auth-token", token);
        localStorage.setItem("user", response.data.data);
        window.alert(response.data.message);

        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
      });
  }

  return (
    <div className="login-container">
      <div className="login">
        <div className="title">
          <span>LogIn</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="details">
            <span>Enter your Email</span>
            <input type="email" placeholder="email" name="email" />
            <span>Enter your Password</span>
            <input type="password" placeholder="password" name="password" />
            <button type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <Link className="link" to="/signup">
          <div className="desc">
            <button> Don't have an account? Signup</button>
          </div>
        </Link>
        <span>
          {error && (
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          )}
        </span>
      </div>
    </div>
  );
};

export default Login;
