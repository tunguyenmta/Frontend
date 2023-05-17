import React, { useState, useEffect } from "react";
import "./DashboardRight.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DashboardRight({ content, avatar }) {
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    for (let key in updateData) {
      formData.append(key, updateData[key]);
    }

    const updateUser = await axios.put(
      `http://localhost:5000/api/user/${
        JSON.parse(localStorage.getItem("user"))._id
      }`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    if (updateUser) {
      navigate("/Login");
    }
  };
  const handleChange = (e) => {
    setUpdateData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const [updateData, setUpdateData] = useState({});
  const choices = [
    {
      title: "Personal Information",
      first: "Name",
      second: "Address",
      third: "Age",
    },
    {
      title: "Payment",
      first: "Visa Card",
      second: "Card Secret",
      third: "Date",
    },
    {
      title: "Change Password",
      first: "Current Password",
      second: "New Password",
      third: "Repeat New Password",
    },
  ];
  useEffect(() => {
    setRightContent(choices[content]);
  }, [content]);

  const [rightContent, setRightContent] = useState({
    title: "",
    first: "",
    second: "",
    third: "",
  });
  return (
    <div className="form-container">
      <form className="form-content ">
        <h2>{rightContent.title}</h2>
        <label htmlFor={rightContent.first}>{rightContent.first}</label>
        <input
          onChange={handleChange}
          id={rightContent.first}
          type="text"
          name={rightContent.first}
        />
        <label htmlFor={rightContent.second}>{rightContent.second}</label>
        <input
          id={rightContent.second}
          type="text"
          name={rightContent.second}
          onChange={handleChange}
        />
        <label htmlFor={rightContent.third}>{rightContent.third}</label>
        <input
          onChange={handleChange}
          id={rightContent.third}
          type="text"
          name={rightContent.third}
        />
        <button className="btn-update" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default DashboardRight;
