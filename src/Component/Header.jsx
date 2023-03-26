import React from 'react'
import './Header.css'
import {FaSearch, FaShoppingCart} from 'react-icons/fa'
import logo from '../Asset/logo-3.png'
import {Link} from 'react-router-dom'
function Header({onClick, theme}) {
  const click = ()=>{
    onClick(theme === "light" ? "dark" : "light");
  }
  return (
    <div>
      <div className={theme==='dark'? 'dark above-section justify-content-end d-flex align-items-center': 'light above-section justify-content-end d-flex align-items-center'}>
        <Link to='Login'>Login</Link>
        <Link to='Register'>Register</Link>
        <Link id='cart' to='ShoppingCart'><FaShoppingCart style={{marginRight: '10px', width: '20px', height:'20px', color: 'orange'}}></FaShoppingCart></Link>
        <button className={theme ==="dark" ? 'active' : ''} onClick={click}></button>
        <p className='text-center'>{theme ==='dark' ? `Dark theme` : `Light theme`}</p>
      </div>
      <div className={theme ==='dark' ? `dark main-section` : `light main-section`}>
        <div className="container-fluid">
          <div className="logo-brand">
            <img src={logo} alt="logo of website" />
            <span>GAMEPEDIA</span>
          </div>
          <form className='form-search'>
            <input type="text" placeholder='what are you looking for?'/>
            <label></label>
            <button>Search<FaSearch style={{marginLeft:'10px'}}></FaSearch> </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Header