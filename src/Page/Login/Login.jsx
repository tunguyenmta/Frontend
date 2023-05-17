import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await axios.post(
      "http://localhost:5000/api/user/login",
      {
        name: loginInfo.username,
        password: loginInfo.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (user) {
      localStorage.setItem("user", JSON.stringify(user.data));
      navigate("/");
    } else {
    }
  };

  const handleGoogle = async () => {
    // let status = await axios.get("http://localhost:5000/api/user/auth/google");
    // console.log(status);
    window.open("http://localhost:5000/api/user/auth/google", "_self");
  };
  const handleGithub = () => {
    window.open("http://localhost:5000/api/user/auth/github", "_self");
  };
  const handleFacebook = () => {
    window.open("http://localhost:5000/api/user/auth/facebook", "_self");
  };
  return (
    <div className="login-content d-flex justify-content-center align-items-center container-fluid">
      <div className="login-container">
        <div className="login-form text-center pt-2">
          <h2 className="login-title">Login</h2>
          <div className="form">
            <input onChange={handleChange} name="username" type="text" />
            <label className={loginInfo.username !== "" ? "d-none" : ""}>
              User name
            </label>
            <input onChange={handleChange} name="password" type="password" />
            <label className={loginInfo.password !== "" ? "d-none" : ""}>
              Password
            </label>
          </div>
          <button className="btn-login" onClick={handleLogin}>
            Sign in
          </button>
          <p className="text-light mt-3 mb-1">Or</p>
          <div className="social-login">
            <button onClick={handleGoogle} className="social-item">
              <FcGoogle></FcGoogle>
            </button>
            <button className="social-item" onClick={handleGithub}>
              <FaGithub></FaGithub>{" "}
            </button>
            <button className="social-item" onClick={handleFacebook}>
              <FaFacebook></FaFacebook>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
