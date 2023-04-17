import React, { useState, useEffect } from "react";
import "./Home.css";
// import data from "../../data/Data";
import Card from "../../Component/Card";
import Header from "../../Component/Header";
import Footer from "../../Component/Footer";
import axios from "axios";
import LoadingSpinner from "../../Component/LoadingSpinner";
function Home() {
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState();
  const [loading, setLoading] = useState("true");
  const changeTheme = (Str) => {
    setTheme(Str);
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
  }, []);
  return (
    <div
      className={
        theme === "light" ? "theme-light text-center" : "theme-dark text-center"
      }
    >
      <Header onClick={changeTheme} theme={theme}></Header>
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
                  key={element._id}
                  imgSrc={element.image}
                  name={element.title}
                  iconSrc={element.icon}
                  desc={element.description}
                  vote={element.rating}
                  rated={element.rated}
                  theme={theme}
                ></Card>
              );
            })
          )}
        </div>
      </div>
      <Footer theme={theme}></Footer>
    </div>
  );
}

export default Home;
