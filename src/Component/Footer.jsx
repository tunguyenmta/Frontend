import React from "react";
import logo from "../Asset/logo-3.png";
import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaTwitch,
  FaGithub,
} from "react-icons/fa";
import "./Footer.css";
function Footer({ theme }) {
  const date = new Date().getFullYear();
  return (
    <footer className={theme}>
      <div className="footer pt-2 container d-flex justify-content-between">
        <div className="left-section">
          <img src={logo} alt="" />
          <span>GAMEPEDIA</span>
        </div>
        <div className="middle-section">
          <Link to="About">About Us</Link>
        </div>
        <div className="right-section">
          <ul>
            <li>
              <FaDiscord
                className="icon-media"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  objectFit: "contain",
                  display: "inline-block",
                }}
              ></FaDiscord>
            </li>
            <li>
              <FaTwitter
                className="icon-media"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  objectFit: "contain",
                  display: "inline-block",
                }}
              ></FaTwitter>
            </li>
            <li>
              <FaFacebookF
                className="icon-media"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  objectFit: "contain",
                  display: "inline-block",
                }}
              ></FaFacebookF>
            </li>
            <li>
              <FaYoutube
                className="icon-media"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  objectFit: "contain",
                  display: "inline-block",
                }}
              ></FaYoutube>
            </li>
            <li>
              <FaTwitch
                className="icon-media"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  objectFit: "contain",
                  display: "inline-block",
                }}
              ></FaTwitch>
            </li>
            <li>
              <FaGithub
                className="icon-media"
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  marginLeft: "10px",
                  objectFit: "contain",
                  display: "inline-block",
                }}
              ></FaGithub>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-footer text-center">
        All right reserve copyright&reg; {date}
      </p>
    </footer>
  );
}

export default Footer;
