import React, { useState } from "react";
import "./Card.css";
import { FaShoppingCart, FaRegCreditCard } from "react-icons/fa";
function Card({ imgSrc, iconSrc, name, desc, vote, rated, theme }) {
  const [rating, setRating] = useState(0);
  const blob = new Blob([Int8Array.from(imgSrc.data.data)], {
    type: imgSrc.contentType,
  });
  const img = window.URL.createObjectURL(blob);
  const blob2 = new Blob([Int8Array.from(iconSrc.data.data)], {
    type: iconSrc.contentType,
  });
  const icon = window.URL.createObjectURL(blob2);
  return (
    <div
      className={
        theme === "light" ? "light card-container" : "dark card-container"
      }
    >
      <div className="card-img">
        <img src={img} alt={name}></img>
      </div>
      <div className="card-icon">
        <img src={icon} alt={name}></img>
      </div>
      <h2 className="title">{name}</h2>
      <div className="card-desc">
        <p className="description">{desc}</p>
        <p className="vote">
          &#9733;<span> {`${vote}/5`}</span> <span>{`(${rated} rated)`}</span>{" "}
        </p>
      </div>
      <div className="rating-star">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              className={index <= rating ? "on" : "off"}
              key={index}
              onMouseEnter={() => setRating(index)}
              onMouseLeave={() => {
                setRating(0);
              }}
            >
              <span>&#9733;</span>
            </button>
          );
        })}
      </div>
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
    </div>
  );
}

export default Card;
