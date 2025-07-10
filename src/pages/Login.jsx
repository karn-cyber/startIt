import React from 'react'
import LoginComponent from '../components/LoginComponent'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeComponent from '../components/HomeComponent'
import Loader from '../components/common/Loader'
export default function Login (){
  const [loading, setLoading] = useState(true);
   let navigate = useNavigate()
  useEffect(() => {
      onAuthStateChanged(auth, (res)=> {
          if(res?.accessToken){
            navigate('/homepage');
          }
          else{
            setLoading(false);
          }
  
      });
  },[]);
  return loading ?<Loader />:<LoginComponent />;
  
}


