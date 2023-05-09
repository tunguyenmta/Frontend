import React, { useState } from "react";
import "./Card.css";
import axios from "axios";
import { FaShoppingCart, FaRegCreditCard, FaTrash } from "react-icons/fa";
function Card({
  imgSrc,
  iconSrc,
  gameId,
  name,
  desc,
  vote,
  rated,
  theme,
  isLogin,
  reload,
  changeState,
  loading,
  isAdmin,
}) {
  const [data, setData] = useState({
    imgSrc,
    iconSrc,
    gameId,
    name,
    desc,
    vote,
    rated,
    isLogin,
    reload,
    loading,
    isAdmin,
  });
  const [rating, setRating] = useState(0);
  // const blob = new Blob([Int8Array.from(data.imgSrc.data.data)], {
  // type: data.imgSrc.contentType,
  // });
  // const img = window.URL.createObjectURL(blob);
  // const blob2 = new Blob([Int8Array.from(data.iconSrc.data.data)], {
  // type: data.iconSrc.contentType,
  // });
  // const icon = window.URL.createObjectURL(blob2);
  const [isRate, setIsRate] = useState(false);
  const handleRate = async (stars) => {
    const rated = await axios.post(
      `http://localhost:5000/api/game/rating/${data.gameId}`,
      { rating: stars }
    );
    if (rated) {
      setIsRate((prev) => !prev);
      data.reload((prev) => !prev);
      data.loading((prev) => !prev);
    }
  };
  const deleteGame = async () => {
    const deleted = await axios.delete(
      `http://localhost:5000/api/game/${data.gameId}`
    );
    if (deleted.status === 200) {
      data.reload((prev) => !prev);
      data.loading((prev) => !prev);
    }
  };
  return (
    <div
      className={
        theme === "light" ? "light card-container" : "dark card-container"
      }
    >
      <div className="card-img">
        <img src={data.imgSrc} alt={data.name}></img>
      </div>
      <div className="card-icon">
        <img src={data.iconSrc} alt={data.name}></img>
      </div>
      <h2 className="title">{data.name}</h2>
      <div className="card-desc">
        <p className="description">{data.desc}</p>
        <p className="vote">
          &#9733;<span> {`${(data.vote / data.rated).toFixed(2)}/5`}</span>{" "}
          <span>{`(${data.rated} rated)`}</span>{" "}
        </p>
      </div>
      {data.isLogin ? (
        <div className="rating-star">
          {!isRate ? (
            [...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  className={index <= rating ? "on" : "off"}
                  key={index}
                  onClick={() => handleRate(index)}
                  onMouseEnter={() => setRating(index)}
                  onMouseLeave={() => {
                    setRating(0);
                  }}
                >
                  <span>&#9733;</span>
                </button>
              );
            })
          ) : (
            <h6>Rated</h6>
          )}
        </div>
      ) : null}
      <div className="buyer">
        <button className="btn-cart">
          <FaShoppingCart style={{ color: "#FFD24C" }}></FaShoppingCart> Add to
          Cart
        </button>
        <button className="btn-buy">
          <FaRegCreditCard style={{ color: "#14C38E" }}></FaRegCreditCard> Buy
          Now
        </button>
      </div>
      {data.isAdmin ? (
        <div className="delete-game">
          <button onClick={deleteGame} className="btn-delete">
            <FaTrash style={{ color: "red" }}></FaTrash> Delete Game
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Card;
