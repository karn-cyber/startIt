import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot, getDocs, updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
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
  
// --- CONNECTIONS FEATURE ---
export const getAllUsers = async () => {
  const snapshot = await getDocs(userRef);
  return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

export const sendConnectionRequest = async (targetUserId, myEmail) => {
  const targetDoc = doc(firestore, 'users', targetUserId);
  await updateDoc(targetDoc, {
    connectionRequests: arrayUnion(myEmail)
  });
};

export const acceptConnectionRequest = async (targetUserId, myId, targetEmail, myEmail) => {
  // Add each other to connections
  const myDoc = doc(firestore, 'users', myId);
  const targetDoc = doc(firestore, 'users', targetUserId);
  await updateDoc(myDoc, {
    connections: arrayUnion(targetEmail),
    connectionRequests: arrayRemove(targetEmail)
  });
  await updateDoc(targetDoc, {
    connections: arrayUnion(myEmail)
  });
};

export const removeConnection = async (targetUserId, myId, targetEmail, myEmail) => {
  const myDoc = doc(firestore, 'users', myId);
  const targetDoc = doc(firestore, 'users', targetUserId);
  await updateDoc(myDoc, {
    connections: arrayRemove(targetEmail)
  });
  await updateDoc(targetDoc, {
    connections: arrayRemove(myEmail)
  });
};
  
  export const checkAndCreateUser = async (user) => {
  // user: { email, name }
  const snapshot = await getDocs(userRef);
  const exists = snapshot.docs.some(doc => doc.data().email === user.email);
  if (!exists) {
    await addDoc(userRef, user);
  }
};
       