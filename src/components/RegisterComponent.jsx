import React, { useState } from 'react';
import GoogleButton from 'react-google-button'
import { RegisterAPI, GoogleSignAPI } from '../api/AuthAPI';
import "../Sass/LoginComponent.scss";
import startitSmall from "../assets/startitSmall.svg";
import startitLogoFull from '/Users/neelanshu./startit/src/assets/StartitLogoFull.svg'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
// import navigate from '../helpers/useNavigate';

export default function RegisterComponent() {

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const login = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Accout Created successfully!");
      navigate("/homepage");
    } catch (err) {
      console.error("Account Creation Failed", err.message);
      toast.error("Account Creation Failed");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignAPI();
    console.log(response);
    navigate("/homepage");
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <img src={startitLogoFull} alt="StartIt Logo" className="logo" />
      </header>

      <main className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Register to Startit</h1>
          <p className="auth-subtitle">Make the most of your professional life</p>

          <input
            className="auth-input"
            type="email"
            placeholder="Email or Phone"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password (6 or more characters)"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />

          <button className="auth-button" onClick={login}>Join</button>

          
          <hr class = "hr-text" data-content="or"/>
          <div className= "google-btn-container">
          <GoogleButton className= "google-btn" onClick={(googleSignIn)} />
          </div>
          <p className="auth-footer">Already on StartIt? <span className="signup-link" onClick={()=> navigate("/")}>Login Now</span></p>
        </div>
      
      </main>
    </div>
  );
}
