import React, { useState } from 'react'
//context variable for register

function Register() {
  return (
    <div className="register-container">
      {/*<form onSubmit=> */}
      <div className='register-side-container'>
        <img src="./ECOGOLD_LOGO_Transparent.png" className='register-logo-img'/>
      </div>
      <form className="register-form">
        <h1 className="register-form-item">Register</h1>
        <div className="register-form-item">
          <input 
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="register-form-item">
          <input 
            type="text"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="register-form-item">
          <input 
            type="text"
            name="email"
            placeholder="Email@domain.com"
          />
        </div>
        <div className="register-form-item">
          <input 
            type="text"
            name="confirmedpassword"
            placeholder="Password"
          />
        </div>
        <div className="register-form-item">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>

  )
}

export default Register