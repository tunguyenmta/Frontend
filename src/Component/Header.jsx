import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import logo from "../Asset/logo-3.png";
import { Link } from "react-router-dom";
function Header({
  onClick,
  isLogin,
  theme,
  login,
  setAdmin,
  trigger,
  loading,
}) {
  const [user, setUser] = useState({
    name: null,
    avatar: null,
    token: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser({
        name: user.name,
        avatar: user.img,
        token: user.token,
      });

      if (user.isAdmin) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setUser({
        name: null,
        avatar: null,
        token: null,
      });
    }
  }, [isLogin]);

  const click = () => {
    onClick(theme === "light" ? "dark" : "light");
  };
  const logoutHandle = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("gamesCart");
    setUser({
      name: null,
      avatar: null,
      token: null,
    });
    setAdmin(false);
    login();
    trigger((prev) => !prev);
    loading((prev) => !prev);
    (function () {
      window.open("http://localhost:5000/api/user/auth/logout", "_self");
    })();
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
          <span className="productNum">
            {JSON.parse(localStorage.getItem("gamesCart"))
              ? JSON.parse(localStorage.getItem("gamesCart")).length
              : 0}
          </span>
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
