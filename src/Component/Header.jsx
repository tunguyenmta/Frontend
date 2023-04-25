import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import logo from "../Asset/logo-3.png";
import { Link } from "react-router-dom";
function Header({ onClick, theme, login }) {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const blob = new Blob([Int8Array.from(user.img.data.data)], {
        type: user.img.data.contentType,
      });
      const img = window.URL.createObjectURL(blob);
      setUser({
        name: user.name,
        avatar: img,
        token: user.token,
      });
      login();
    } else {
      setUser({
        name: null,
        avatar: null,
        token: null,
      });
    }
  }, []);
  const [user, setUser] = useState({
    name: null,
    avatar: null,
    token: null,
  });
  const click = () => {
    onClick(theme === "light" ? "dark" : "light");
  };
  const logoutHandle = () => {
    localStorage.removeItem("user");
    setUser({
      name: null,
      avatar: null,
      token: null,
    });
    login();
  };
  return (
    <div>
      <div
        className={
          theme === "dark"
            ? "dark above-section justify-content-end d-flex align-items-center"
            : "light above-section justify-content-end d-flex align-items-center"
        }
      >
        {user.name !== null ? (
          <>
            <Link className="dashboard" to="/Dashboard">
              <img
                className="user-avatar"
                src={user.avatar}
                alt="testing"
              ></img>
            </Link>
            <button className={theme} onClick={logoutHandle} id="logout">
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="Login">Login</Link>
            <Link to="Register">Register</Link>
          </>
        )}

        <Link id="cart" to="ShoppingCart">
          <FaShoppingCart
            style={{
              marginRight: "10px",
              width: "20px",
              height: "20px",
              color: "orange",
            }}
          ></FaShoppingCart>
        </Link>
        <button
          className={theme === "dark" ? "active" : ""}
          onClick={click}
        ></button>
        <p className="text-center">
          {theme === "dark" ? `Dark theme` : `Light theme`}
        </p>
      </div>
      <div
        className={
          theme === "dark" ? `dark main-section` : `light main-section`
        }
      >
        <div className="container-fluid">
          <div className="logo-brand">
            <img src={logo} alt="logo of website" />
            <span>GAMEPEDIA</span>
          </div>
          <form className="form-search">
            <input type="text" placeholder="what are you looking for?" />
            <label></label>
            <button>
              Search<FaSearch style={{ marginLeft: "10px" }}></FaSearch>{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Header;
