import React, { useState } from 'react';
import GoogleButton from 'react-google-button'
import { LoginAPI, GoogleSignAPI } from '../api/AuthAPI';
import "../Sass/LoginComponent.scss";
import startitSmall from "../assets/startitSmall.svg";
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
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success("Signed In to StartIt successfully!");
    } catch (err) {
      console.error("Login Failed:", err.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const googleSignIn = () => {
    let response = GoogleSignAPI();
    console.log(response);
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <img src={startitSmall} alt="StartIt Logo" className="logo" />
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
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />

          <button className="auth-button" onClick={login}>Sign In</button>

          
          <hr class = "hr-text" data-content="or"/>
          <div className= "google-btn-container">
          <GoogleButton className= "google-btn" onClick={(googleSignIn)} />
          </div>
          <p className="auth-footer">New to StartIt? <span className="signup-link" onClick={()=> navigate("/register")}>Join now</span></p>
        </div>
      
      </main>
    </div>
  );
}
