import React, { useState } from "react";
import "./Item.css";
import { FaTrashAlt, FaWindowClose } from "react-icons/fa";
function Item({
  title,
  gameImg,
  price,
  rating,
  titleImg,
  deleteAll,
  deleteItem,
  id,
}) {
  const removeAll = () => {
    deleteItem([]);
    localStorage.removeItem("gamesCart");
  };
  const [gameId, setId] = useState(id);
  const handleDeleteItem = (id) => {
    localStorage.setItem(
      "gamesCart",
      JSON.stringify(
        JSON.parse(localStorage.getItem("gamesCart")).filter((ele) => {
          return ele._id !== gameId;
        })
      )
    );
    deleteItem(JSON.parse(localStorage.getItem("gamesCart")));
  };
  return (
    <div className="game-item text-center">
      <h3 className="game-title">{title}</h3>
      {titleImg !== undefined ? (
        <h6 className="titleImg">{titleImg}</h6>
      ) : (
        <img src={gameImg} alt="" />
      )}

      <p className="game-rating">
        {rating} <span>&#9733;</span>
      </p>
      <p className="game-price">{price}</p>

      {deleteAll === undefined ? (
        <button onClick={handleDeleteItem} className="remove">
          <FaWindowClose
            style={{ width: "15px", height: "15px" }}
          ></FaWindowClose>
        </button>
      ) : (
        <button className="remove-all" onClick={removeAll}>
          <FaTrashAlt style={{ width: "20px", height: "20px" }}></FaTrashAlt>
        </button>
      )}
    </div>
  );
}

export default Item;
