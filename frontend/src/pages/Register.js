import React, { useState,useContext } from "react";
import FormInput from "../components/FormInput";
import Popup from '../components/Popup'
import ButtonComponent from "../components/ButtonComponent";
import axios from "axios";
//context variable for register

function Register({setRegisterPage}) {
  const [formDetails,setFormDetails] = useState({});
  const [confirmPopup, setConfirmPopup] = useState(false)
  const [failurePopup, setFailurePopup] = useState(false)
  const code = process.env.REACT_APP_INV_CODE

  const handleRegister = async (e) => {
    e.preventDefault();
    
      try {
        const response = await axios.post('https://ecogoldproduction.onrender.com/api/user',formDetails,
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: false
        });
        console.log(response.data)
        setConfirmPopup(true)
        //setLogToggle(true)
      } catch (error) {
        console.log(error.response.data)
        setFailurePopup(true)
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
      <ButtonComponent buttonClass="register-switch-button" onClick={() => setRegisterPage(false)} buttonText="Task Viewer" />
      <Popup className="popup-register-confirm" trigger={confirmPopup} setTrigger={setConfirmPopup}>
            <p>New user registered!</p>
      </Popup>
      <Popup className="popup-register-failure" trigger={failurePopup} setTrigger={setFailurePopup}>
            <p>Failure to register user, please try again.</p>
      </Popup>
    </div>
  );
}

export default Register;
