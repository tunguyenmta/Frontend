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
  const [loading, setLoading] = useState("true");
  const changeTheme = (Str) => {
    setTheme(Str);
  };
  const [isLogin, setIsLogin] = useState(false);
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
        login={userLogin}
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
