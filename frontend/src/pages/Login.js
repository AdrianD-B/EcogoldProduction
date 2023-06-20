import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import ButtonComponent from "../components/ButtonComponent";

function Login({ setLogToggle }) {
  const { setLoggedIn } = useContext(AuthContext)
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoggedIn(true)
  };

  return (
    <>
      <div className="login-container">
        <div className="login-side-container">
          <img src="./ECOGOLD_LOGO_Transparent.png" className='login-logo-img' />
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <h1 className="login-form-item">Login</h1>
          <div className="login-form-item">
            <p>Email</p>
            <input type="email" required />
          </div>
          <div className="login-form-item">
            <p>Password</p>
            <input type="password" required />
          </div>
          <div className="login-form-item">
            <ButtonComponent buttonClass="login-button" type="submit" buttonText={"Login"}></ButtonComponent>
          </div>
          <p>Don't have an account? sign up <b onClick={() => setLogToggle(false)}>here</b></p>
        </form>

      </div>
    </>
  );
}

export default Login;
