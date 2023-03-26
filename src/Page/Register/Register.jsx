import React, {useState} from 'react'
import './Register.css'
import {Link} from 'react-router-dom'
function Register() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    email: ""
  })
  const onChangeHandle = (e)=>{
    setInfo((prev)=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  return (
    <div className='container-fluid register-container d-flex align-items-center'>
      <div className="register-content container d-flex align-items-center justify-content-center">
        <div className="form-register">
          <div className="form-right text-center">
            <h2 className='form-title'>Register</h2>
            <div className="form-input d-flex flex-column">
              <input className={info.username !== "" ? 'mb-4' : ''} onChange={onChangeHandle} name='username' type="text" />
              <label className={info.username !== "" ? 'd-none mt-3' : ''}>User Name</label>
              <input className={info.password !== "" ? 'mb-4' : ''} onChange={onChangeHandle} name='password' type="password" />
              <label className={info.password !== "" ? 'd-none mt-3' : ''}>Password</label>
              <input className={info.repeatPassword !== "" ? 'mb-4' : ''} onChange={onChangeHandle} name='repeatPassword' type="password" />
              <label className={info.repeatPassword !== "" ? 'd-none mt-3' : ''}>Repeat Password</label>
              <input className={info.email !== "" ? 'mb-4' : ''} onChange={onChangeHandle} name='email' type="email" />
              <label className={info.email !=="" ? 'd-none mt-3': ''}>Email</label>
              <div className='form-click'>
                <input type="checkbox" name="term" id="term"/>
                <span>I agree with all the <Link to='/Term'>Term of services</Link></span>
              </div>
            </div>
            <div className="signup">
              <button className='btn-signup'>Sign up</button>
              <Link to='/'>Already have account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register