import React, { useState, useEffect } from "react";
import "./Home.css";
import Card from "../../Component/Card";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import axios from "axios";
import LoadingSpinner from "../../Component/LoadingSpinner";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("gamesCart"))
      ? JSON.parse(localStorage.getItem("gamesCart")).map((ele) => ele._id)
      : []
  );
  const [gamesCart, setGamesCart] = useState(
    JSON.parse(localStorage.getItem("gamesCart"))
      ? JSON.parse(localStorage.getItem("gamesCart"))
      : []
  );
  const changeTheme = (Str) => {
    setTheme(Str);
  };

  const userLogin = () => {
    setIsLogin((prev) => !prev);
  };
  async function getData() {
    let serverData = await axios.get("http://localhost:5000/api/game/");
    let gameData = await serverData.data;
    if (gameData) {
      setLoading((prev) => {
        return !prev;
      });
    }
    setData(gameData);
  }
  useEffect(() => {
    fetch("http://localhost:5000/api/user/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("authentication has been failed!");
      })
      .then((data) => {
        if (data.name) {
          localStorage.setItem("user", JSON.stringify(data));
          setIsLogin(true);
        } else {
          console.log("test");
          setIsLogin(false);
        }
      })
      .catch((err) => console.log(err));

    getData();
  }, [trigger]);
  return (
    <div
      className={
        theme === "light" ? "theme-light text-center" : "theme-dark text-center"
      }
    >
      <Header
        setAdmin={setIsAdmin}
        onClick={changeTheme}
        theme={theme}
        isLogin={isLogin}
        login={userLogin}
        trigger={setTrigger}
        loading={setLoading}
      ></Header>
      <div
        className={
          theme === "light" ? "theme-light container" : "theme-dark container"
        }
      >
        <div className="game-list row mx-2 px-2">
          {loading ? (
            <LoadingSpinner></LoadingSpinner>
          ) : (
            data.map((element) => {
              return (
                <Card
                  reload={setTrigger}
                  isLogin={isLogin}
                  key={element._id}
                  gameId={element._id}
                  imgSrc={element.image}
                  name={element.title}
                  iconSrc={element.icon}
                  desc={element.description}
                  vote={element.rating}
                  rated={element.rated}
                  theme={theme}
                  loading={setLoading}
                  isAdmin={isAdmin}
                  addCart={setProducts}
                  addGamesCart={setGamesCart}
                  price={element.price}
                ></Card>
              );
            })
          )}
          {isAdmin ? (
            <Link className="createGame" to="/CreateGame">
              <div className="addContainer usable">
                <div className="addGame ">
                  <button className="btn-add">
                    <FaPlus
                      className="buttonAdd"
                      style={{
                        display: "block",
                        width: "80px",
                        height: "80px",
                      }}
                    ></FaPlus>
                  </button>
                  <h4>Create New Game</h4>
                </div>
              </div>
            </Link>
          ) : (
            <div className="addContainer disable">
              <div className="addGame ">
                <button className="btn-add" disabled={true}>
                  <FaPlus
                    className="buttonAdd"
                    style={{
                      display: "block",
                      width: "80px",
                      height: "80px",
                      color: "gray",
                    }}
                  ></FaPlus>
                </button>
                <h4>Create New Game</h4>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer theme={theme}></Footer>
    </div>
  );
}

export default Home;
