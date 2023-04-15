import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
function Register() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    avatar: null,
    email: "",
  });
  const navigate = useNavigate();
  const onChangeHandle = (e) => {
    setInfo((prev) => {
      if (e.target.name !== "avatar") {
        return { ...prev, [e.target.name]: e.target.value };
      } else {
        return { ...prev, [e.target.name]: e.target.files[0] };
      }
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", info.username);
    form.append("password", info.password);
    form.append("image", info.avatar);
    form.append("email", info.email);
    axios
      .post("http://localhost:5000/api/user/register", form)
      .then((res) => {
        toast.success("Successful registration", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((err) => {
        toast.error("Failed, check your infomation", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  return (
    <div className="container-fluid register-container d-flex align-items-center">
      <ToastContainer />;
      <div className="register-content container d-flex align-items-center justify-content-center">
        <div className="form-register">
          <div className="form-right text-center">
            <h2 className="form-title">Register</h2>
            <div className="form-input d-flex flex-column">
              <input
                className={info.username !== "" ? "mb-4" : ""}
                onChange={onChangeHandle}
                name="username"
                type="text"
              />
              <label className={info.username !== "" ? "d-none mt-3" : ""}>
                User Name
              </label>
              <input
                className={info.password !== "" ? "mb-4" : ""}
                onChange={onChangeHandle}
                name="password"
                type="password"
              />
              <label className={info.password !== "" ? "d-none mt-3" : ""}>
                Password
              </label>

              <input
                className={info.email !== "" ? "mb-4" : ""}
                onChange={onChangeHandle}
                name="email"
                type="email"
              />
              <label className={info.email !== "" ? "d-none mt-3" : ""}>
                Email
              </label>

              <input
                className={info.avatar !== "" ? "mb-4" : ""}
                onChange={onChangeHandle}
                name="avatar"
                type="file"
              />
              <label className={info.avatar !== "" ? "d-none mt-3" : ""}>
                Choose your avatar
              </label>
              <div className="form-click">
                <input type="checkbox" name="term" id="term" />
                <span>
                  I agree with all the <Link to="/Term">Term of services</Link>
                </span>
              </div>
            </div>
            <div className="signup">
              <button onClick={handleClick} className="btn-signup">
                Sign up
              </button>
              <Link to="/">Already have account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
