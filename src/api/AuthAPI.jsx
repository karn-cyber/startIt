import {signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const LoginAPI = (email,password) => { 
    try{
    let response = signInWithEmailAndPassword(auth,email,password);
    return response;
} catch (err) {
    return err;
    
}
};

export const RegisterAPI = (email,password) => { 
        try{
        let response = createUserWithEmailAndPassword(auth,email,password);
        return response;
    } catch (err) {
        return err;
        
    }
};

export const GoogleSignAPI = () => {
    try{
        let googleProvider = new GoogleAuthProvider();
        let res = signInWithPopup(auth, googleProvider);
        return res;
    }
    catch (err) {
        return err;
    }
}

export const onLogout = async () => {
    try {
        await signOut(auth);
        console.log("Logged out successfully");
        // Optionally: window.location.reload() or navigate to login
    } catch (err) {
        console.error("Logout error:", err);
        return err;
    }
};
