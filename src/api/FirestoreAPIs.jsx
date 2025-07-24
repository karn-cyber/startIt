import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import {toast} from 'react-toastify';

let dbRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
export const postStatus = (object) => {
    
    addDoc(dbRef, object)
    .then((res) => {
        console.log("Post added successfully:", res.id);
        toast.success("Post added successfully:");
    })
    .catch((err) => {
        console.error("Error adding post:", err)
        toast.error("Error adding post:");
    });

}

export const getStatus = (setAllStatus) => {
     onSnapshot(dbRef, (response) => {
        setAllStatus(response.docs.map((docs) => {
            return {
                ...docs.data(),
                id: docs.id
            }
        }))
     })
};

export const postUserData = (object) => {
    addDoc(userRef, object)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
  
  export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
      setCurrentUser(
        response.docs
          .map((docs) => {
            return { ...docs.data(), id: docs.id };
          })
          .filter((item) => {
            return item.email === localStorage.getItem("userEmail");
          })[0]
      );
    });
  };
  
       