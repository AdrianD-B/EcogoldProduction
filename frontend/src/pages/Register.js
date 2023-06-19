import React, { useState } from 'react'
//context variable for register

function Register() {
  return (
    <div className="register-container">
      {/*<form onSubmit=> */}
      <form className="register-form">
        <div>
          <h1>Register</h1>
        </div>
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
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>

  )
}

export default Register