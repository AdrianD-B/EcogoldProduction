import React, { useState,useContext } from "react";
import FormInput from "../components/FormInput";
import ButtonComponent from "../components/ButtonComponent";
import axios from "axios";
//context variable for register

function Register({setLogToggle}) {
  const [formDetails,setFormDetails] = useState({});
  const code = process.env.REACT_APP_INV_CODE

  const handleRegister = async (e) => {
    e.preventDefault();
    if(formDetails.invitation === code){
      try {
        const response = await axios.post('http://localhost:3001/api/user',formDetails,
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: false
        });
        console.log(response.data)
        setLogToggle(true)
      } catch (error) {
        console.log(error.response.data)
      }
    }else{
      console.log('invalid invitation code')
    }
  }

  const handleFormInputChange = (e) => {
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register-container">
      <div className="register-side-container">
        <img
          src="./ECOGOLD_LOGO_Transparent.png"
          className="register-logo-img"
          alt="EcogoldLogo"
        />
      </div>
      <form onSubmit={handleRegister} className="register-form">
        <FormInput
          inputClass="register-form-item"
          inputType="text"
          value={formDetails.name}
          onChange={handleFormInputChange}
          header="Name"
        />
        <FormInput
          inputClass="register-form-item"
          inputType="email"
          value={formDetails.email}
          onChange={handleFormInputChange}
          header="Email"
        />
        <FormInput
          inputClass="register-form-item"
          inputType="text"
          value={formDetails.invitation}
          onChange={handleFormInputChange}
          header="Invitation"
        />
        <FormInput
          inputClass="register-form-item"
          inputType="password"
          value={formDetails.password}
          onChange={handleFormInputChange}
          header="Password"
        />
        <button type="submit" className="register-button-container">
          <ButtonComponent
            buttonClass="register-button"
            buttonText="Register"
          />
        </button>
      </form>
    </div>
  );
}

export default Register;
