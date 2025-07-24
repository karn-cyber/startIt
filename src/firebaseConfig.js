// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {Firestore, getFirestore} from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYYexwj-IBSiOP9wk0jwFKhue7FLFO3mI",
  authDomain: "startit-13018.firebaseapp.com",
  projectId: "startit-13018",
  storageBucket: "startit-13018.firebasestorage.app",
  messagingSenderId: "489939681039",
  appId: "1:489939681039:web:3178c7a1d45cbd7e0ac87a",
  measurementId: "G-2GGTNW0L72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
export {auth, app, firestore };
// const analytics = getAnalytics(app);