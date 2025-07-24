import React, { useState } from 'react';
import GoogleButton from 'react-google-button'
import { LoginAPI, GoogleSignAPI } from '../api/AuthAPI';
import { checkAndCreateUser } from '../api/FirestoreAPIs';
import "../Sass/LoginComponent.scss";
import startitLogoFull from '../assets/StartitLogoFull.svg'
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { CgSoftwareDownload } from 'react-icons/cg';
// import navigate from '../helpers/useNavigate';

export default function LoginComponent() {

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      await checkAndCreateUser({ email: res.user.email, name: res.user.displayName || '' });
      toast.success("Signed In to StartIt successfully!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/homepage");
      
      // localStorage.setItem("userEmail", res.user.email);
      
    } catch (err) {
      console.error("Login Failed:", err.message);
      toast.error("Login failed. Please check your credentials.");
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
          <h1 className="auth-title">Sign in</h1>
          <p className="auth-subtitle">Step into the world of opportunities</p>

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
