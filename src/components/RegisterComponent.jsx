import React, { useState } from 'react';
import GoogleButton from 'react-google-button'
import { RegisterAPI, GoogleSignAPI } from '../api/AuthAPI';
import { checkAndCreateUser } from '../api/FirestoreAPIs';
import "../Sass/LoginComponent.scss";
import startitLogoFull from '../assets/StartitLogoFull.svg'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
// import navigate from '../helpers/useNavigate';

export default function RegisterComponent() {

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      // Save user info to Firestore users collection
      if (res.user && credentials.name) {
        postUserData({
          email: credentials.email,
          name: credentials.name,
        });
      }
      await checkAndCreateUser({ email: res.user.email, name: credentials.name || '' });
      toast.success("Accout Created successfully!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/homepage");
    } catch (err) {
      console.error("Account Creation Failed", err.message);
      toast.error("Account Creation Failed");
    }
  };

  const googleSignIn = async () => {
    let response = await GoogleSignAPI();
    await checkAndCreateUser({ email: response.user.email, name: response.user.displayName || '' });
    localStorage.setItem("userEmail", response.user.email);
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
            type="name"
            placeholder="Your Name"
            value={credentials.name}
            onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
          />
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

          <button className="auth-button" onClick={register}>Join</button>

          
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
