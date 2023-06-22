import React, { useState } from "react";
import FormInput from "../components/FormInput";
import ButtonComponent from "../components/ButtonComponent";
//context variable for register

function Register() {
  const [formDetails,setFormDetails] = useState({});

  const handleRegister = async(e) => {
    e.preventDefault();
    if(formDetails.invitation === process.env.REACT_APP_INV_CODE){
      console.log("worked")
    }else{console.log('no work')}
    console.log(process.env.REACT_APP_INV_CODE)
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
