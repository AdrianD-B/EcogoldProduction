import React, { useState, useContext, useRef } from "react";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import ButtonComponent from "../components/ButtonComponent";
import FormInput from "../components/FormInput";

function Login({ setLogToggle }) {
  const { setAuth,setLoggedIn } = useContext(AuthContext);
  const [formDetails, setFormDetails] = useState({});
  const formRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/user/login',formDetails,
      {
        headers: {'Content-Type': 'application/json'},
        withCredentials: false
      });

      if(response.data.message === "User not found"){
        console.log(response.data.message)
      }else{
        setAuth({name: response.data.name, email: formDetails.email, admin: response.data.admin, token: response.data.token})
        setLoggedIn(true)
      }
    } catch (error) {
      console.log(error.response.data)
    }
  };

  const handleFormInputChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-side-container">
          <img
            src="./ECOGOLD_LOGO_Transparent.png"
            className="login-logo-img"
            alt="EcogoldLogo"
          />
        </div>
        <form ref={formRef} className="login-form" onSubmit={handleLogin}>
          <FormInput
            inputClass="login-form-item"
            value={formDetails.email}
            onChange={handleFormInputChange}
            inputType="email"
            header="Email"
          />
          <FormInput
            inputClass="login-form-item"
            value={formDetails.password}
            onChange={handleFormInputChange}
            inputType="password"
            header="Password"
          />
          <button type="submit" className="login-button-container">
            <ButtonComponent
              buttonClass="login-button"
              buttonText="Login"
            ></ButtonComponent>
          </button>
          <p className="login-form-item">
            Don't have an account? sign up{" "}
            <b onClick={() => setLogToggle(false)}>here</b>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
