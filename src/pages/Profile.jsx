import React from 'react';
import ProfileComponent from '../components/ProfileComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate('/');
      } else {
        setLoading(false);
      }
    });
  }, []);

  return loading ? <Loader /> : <ProfileComponent />;
}
