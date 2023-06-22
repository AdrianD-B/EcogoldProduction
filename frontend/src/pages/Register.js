import React, { useState } from "react";
import FormInput from "../components/FormInput";
import ButtonComponent from "../components/ButtonComponent";
//context variable for register

function Register() {
  return (
    <div className="register-container">
      {/*<form onSubmit=> */}
      <div className="register-side-container">
        <img
          src="./ECOGOLD_LOGO_Transparent.png"
          className="register-logo-img"
          alt="EcogoldLogo"
        />
      </div>
      <form className="register-form">
        <FormInput
          inputClass="register-form-item"
          inputType="text"
          header="Name"
        />
        <FormInput
          inputClass="register-form-item"
          inputType="email"
          header="Email"
        />
        <FormInput
          inputClass="register-form-item"
          inputType="text"
          header="Invitation Code"
        />
        <FormInput
          inputClass="register-form-item"
          inputType="password"
          header="Password"
        />
        <FormInput
          inputClass="register-form-item"
          inputType="password"
          header="Confirm Password"
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
