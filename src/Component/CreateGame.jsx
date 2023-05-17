import React, { useState } from "react";
import "./CreateGame.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateGame() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [gameInfo, setGameInfo] = useState({
    title: null,
    description: null,
    gameImage: null,
    iconImage: null,
    price: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setGameInfo((prev) => {
      if (e.target.name !== "gameImage" && e.target.name !== "iconImage") {
        return { ...prev, [e.target.name]: e.target.value };
      } else {
        return { ...prev, [e.target.name]: e.target.files[0] };
      }
    });
  };
  const handleClick = async () => {
    const fd = new FormData();
    const temp = [];
    temp.push(gameInfo.gameImage);
    temp.push(gameInfo.iconImage);
    temp.forEach((ele) => {
      fd.append("gameImage", ele);
    });
    fd.append("creator", user._id);
    fd.append("title", gameInfo.title);
    fd.append("price", gameInfo.price);
    fd.append("description", gameInfo.description);
    const result = await axios.post(
      "http://localhost:5000/api/game/creategame",
      fd
    );
    if (result.status === 201) {
      navigate("/");
    }
  };
  return (
    <div className="form-container">
      <div className="form-content">
        <h3>Create Game</h3>
        <label htmlFor="title">Game Title</label>
        <input onChange={handleChange} name="title" id="title" type="text" />
        <label htmlFor="description">Game Description</label>
        <textarea
          onChange={handleChange}
          id="description"
          name="description"
          rows="4"
          cols="50"
        />
        <label htmlFor="image">Game Image</label>
        <input
          onChange={handleChange}
          id="image"
          name="gameImage"
          type="file"
        />
        <label htmlFor="icon">Game Icon</label>
        <input onChange={handleChange} id="icon" name="iconImage" type="file" />
        <label htmlFor="price">Price</label>
        <input
          onChange={handleChange}
          name="price"
          id="price"
          type="number"
          min={0}
        />
        <button onClick={handleClick} className="btn-create">
          Create Game
        </button>
      </div>
    </div>
  );
}

export default CreateGame;
