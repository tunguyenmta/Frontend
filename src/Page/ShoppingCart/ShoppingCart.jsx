import React, { useState } from "react";
import "./ShoppingCart.css";
import { useNavigate } from "react-router-dom";
import Item from "../../Component/Item";
function ShoppingCart() {
  const [games, setGames] = useState(
    JSON.parse(localStorage.getItem("gamesCart"))
      ? JSON.parse(localStorage.getItem("gamesCart"))
      : []
  );

  const navigate = useNavigate();
  const back = () => {
    navigate("/");
  };
  return (
    <div className="cart">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-container">
        <Item
          title={"Title"}
          titleImg={"Theme"}
          rating={"Rating"}
          price={"Price"}
          deleteAll={"Remove All"}
          deleteItem={setGames}
        ></Item>
        {games.length > 0
          ? games.map((game) => {
              return (
                <Item
                  id={game._id}
                  key={game._id}
                  title={game.title}
                  gameImg={game.image}
                  rating={game.rated > 0 ? game.rating / game.rated : "0"}
                  price={`${game.price} $`}
                  deleteItem={setGames}
                ></Item>
              );
            })
          : null}
      </div>
      <div className="total d-flex mt-4">
        <div className="total-container">
          <h5 className="px-5">Total</h5>
          <h5>
            {games.reduce((acc, current) => {
              return (acc += current.price);
            }, 0)}
            <span> $</span>
          </h5>
        </div>
      </div>
      <div className="checkout d-flex mt-3">
        <div className="checkout-container">
          <button onClick={back} className="mx-5 btn-back">
            Buy More
          </button>
          <button className="btn-checkout">Check Out</button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
