import React,{useState} from 'react'
import './Login.css'
import {FcGoogle} from 'react-icons/fc';
import {FaGithub, FaFacebook} from 'react-icons/fa'
import {Link} from 'react-router-dom'
function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: ""
  })
  const handleChange = (e)=>{
    setLoginInfo((prev)=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  return (
    <div className='login-content d-flex justify-content-center align-items-center container-fluid'>
      <div className="login-container">
        <div className="login-form text-center pt-2">
          <h2 className='login-title'>Login</h2>
          <div className="form">
            <input  onChange={handleChange} name='username' type="text" />
            <label className={loginInfo.username !== "" ? 'd-none' : ''}>User name</label>
            <input  onChange={handleChange} name='password' type="password" />
            <label className={loginInfo.password !== "" ? 'd-none' : ''} >Password</label>
          </div>
          <button className='btn-login'>Sign in</button>
          <p className='text-light mt-3 mb-1'>Or</p>
          <div className="social-login">
            <Link className='social-item' to='/'><FcGoogle></FcGoogle></Link>
            <Link className='social-item' to='/'><FaGithub></FaGithub> </Link>
            <Link className='social-item' to='/'><FaFacebook></FaFacebook> </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login