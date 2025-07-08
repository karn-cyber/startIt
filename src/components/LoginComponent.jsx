import React from 'react'
import { LoginAPI } from '../api/AuthAPI';
import "../Sass/LoginComponent.scss"; 
export default function LoginComponent() {
  const login = () => {
    // Call the login API here
    LoginAPI();
  };
  return (
    <>
      <div><h1>Login Component</h1></div>
      <button onClick={login} className = "login-btn">
        Log in to StartIT
        </button>
    </>
  );
}
