import React,{useContext} from "react";
import AuthContext from "../context/AuthProvider";
import FormInput from "../components/FormInput";

function Login({setLogToggle}) {
  const {setLoggedIn} = useContext(AuthContext)
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoggedIn(true)
  };

  return (
    <>
      <div className="login-container">
        <div className="login-side-container">
        <img src="./ECOGOLD_LOGO_Transparent.png" className='login-logo-img'/>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <h1 className="login-form-item">Login</h1>
          <FormInput inputClass="login-form-item" inputType="email" header="Email" />
          <FormInput inputClass="login-form-item" inputType="password" header="Password" />
          <div className="login-form-item">
            <button type="submit">Login</button>
          </div>
          <p>Don't have an account? sign up <b onClick={() => setLogToggle(false)}>here</b></p>
        </form>
        
      </div>
    </>
  );
}

export default Login;
