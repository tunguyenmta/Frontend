import React, {useState} from 'react'
import './Home.css';
import data from '../../data/Data';
import Card from '../../Component/Card'
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
function Home() {
  const [theme, setTheme] = useState("light")
  const changeTheme = (Str)=>{
    setTheme(Str)
  }
  return (
    <div className={theme === "light" ?  'theme-light text-center': 'theme-dark text-center'}>
      <Header onClick = {changeTheme} theme={theme}></Header>
      <div className={theme ==='light' ? 'theme-light container' : 'theme-dark container'}>
        <div className="game-list row mx-2 px-2"> 
      {data.map((element)=>{
        return <Card key={element.id} imgSrc={element.imgSrc} name={element.name} iconSrc={element.iconSrc} desc={element.desc} vote={element.vote} rated={element.rated} theme={theme}></Card>
      })}
      </div>
      </div>
      <Footer theme={theme}></Footer>
    </div>
  )
}

export default Home