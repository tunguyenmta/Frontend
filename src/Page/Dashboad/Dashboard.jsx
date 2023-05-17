import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import DashboardRight from "../../Component/DashboardRight";
import { FaTwitter, FaFacebookF, FaGooglePlusG, FaHome } from "react-icons/fa";
function Dashboard() {
  const navigate = useNavigate();
  const [change, setChange] = useState({
    avatar: null,
  });
  const [user, setUser] = useState({
    name: null,
    avatar: null,
    email: null,
    id: null,
  });
  const [update, setUpdate] = useState({
    avatar: JSON.parse(localStorage.getItem("user")).img,
  });

  const fileChange = (e) => {
    setUpdate((prev) => {
      return { ...prev, [e.target.name]: e.target.files[0] };
    });
    setChange({ avatar: window.URL.createObjectURL(e.target.files[0]) });
  };
  const handleChangeRight = (e) => {
    setChosen({
      choice: e.target.parentElement.id,
      content: e.target.parentElement.id.split("")[3] - 1,
    });
  };
  const [chosen, setChosen] = useState({ choice: "btn1", content: 0 });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser) {
      const blob = new Blob([Int8Array.from(currentUser.img.data.data)], {
        type: currentUser.img.data.contentType,
      });
      const img = window.URL.createObjectURL(blob);
      setUser({
        name: currentUser.name,
        avatar: img,
        email: currentUser.email,
        id: currentUser._id,
      });
      setChange({ avatar: img });
    } else {
      setUser({
        name: null,
        avatar: null,
        email: null,
        id: null,
      });
    }
  }, []);
  // const updateAvatar = async () => {
  //   const fd = new FormData();
  //   fd.append("avatar", update.avatar);
  //   fd.append("name", update.name);
  //   fd.append("age", update.age);
  //   fd.append("address", update.address);
  //   const updateUser = await axios.put(
  //     `http://localhost:5000/api/user/${update.id}`,
  //     fd,
  //     {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   if (updateUser) {
  //     localStorage.removeItem("user");
  //     navigate("/Login");
  //   }
  // };
  const back = () => {
    navigate("/");
  };
  return (
    <div className="dashboard-container">
      <div className="back-home text-center mb-3" onClick={back}>
        <span className="text-danger">Back Home </span>
        <FaHome
          style={{ width: "30px", height: "30px", color: "salmon" }}
        ></FaHome>
      </div>
      <div className="dashboard-content d-flex">
        <div className="dashboard-left d-flex justify-content-end">
          <div className="left-content">
            <h3>MY PROFILE</h3>
            <div className="dashboard-avatar d-flex">
              <img src={change.avatar} alt="" />
              <div className="avatar-content">
                <input
                  onChange={fileChange}
                  id="avatar"
                  type="file"
                  name="avatar"
                  style={{ display: "none" }}
                />
                <label htmlFor="avatar">Upload image file</label>
                {/* <button className="btn-change">Change</button> */}
                <div className="social-icons d-flex justify-content-center">
                  <div className="icon-container">
                    <FaTwitter
                      style={{
                        width: "15px",
                        height: "15px",
                        lineHeight: "15px",
                        fontSize: "10px",
                        display: "inline-block",
                      }}
                    ></FaTwitter>
                  </div>
                  <div className="icon-container">
                    <FaFacebookF
                      style={{
                        width: "15px",
                        height: "15px",
                        lineHeight: "15px",
                        fontSize: "10px",
                        display: "inline-block",
                      }}
                    ></FaFacebookF>
                  </div>
                  <div className="icon-container">
                    <FaGooglePlusG
                      style={{
                        width: "15px",
                        height: "15px",
                        lineHeight: "15px",
                        fontSize: "10px",
                        display: "inline-block",
                      }}
                    ></FaGooglePlusG>
                  </div>
                </div>
              </div>
            </div>
            <div className="selections">
              <ul>
                <li className={chosen.choice === "btn1" ? "active" : null}>
                  <button id="btn1" onClick={handleChangeRight} name="button1">
                    <h2>Personal Detail</h2>
                    <p>Please fill up your</p>
                  </button>
                </li>
                <li className={chosen.choice === "btn2" ? "active" : null}>
                  <button id="btn2" onClick={handleChangeRight} name="button2">
                    <h2>Paying Method</h2>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </button>
                </li>
                <li className={chosen.choice === "btn3" ? "active" : null}>
                  <button id="btn3" onClick={handleChangeRight} name="button3">
                    <h2>Change Password</h2>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Cumque, modi!
                    </p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="dashboard-right">
          <DashboardRight
            content={chosen.content}
            avatar={update.avatar}
          ></DashboardRight>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
