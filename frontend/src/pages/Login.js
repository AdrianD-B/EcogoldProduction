import React from 'react'

function Login() {

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
    } catch (error) {
      
    }
  }

  return (
    <>
      <div className='login-container'>
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className='login-form-item'>
            <p>Email</p>
            <input type="email" required/>
          </div>
          <div className='login-form-item'>
            <p>Password</p>
            <input type="password" required/>
          </div>
          <div className='login-form-item'>
            <button type='submit'>Login</button>
          </div>
        </form>
        <p>Don't have an account? sign up here</p>
      </div>
    </>
  )
}

export default Login