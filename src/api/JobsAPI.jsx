import { firestore } from '../firebaseConfig';
import { addDoc, collection, onSnapshot, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';

let jobsRef = collection(firestore, "jobs");

export const postJob = (jobObject) => {
  return addDoc(jobsRef, jobObject)
    .then((res) => {
      console.log("Job posted successfully:", res.id);
      return res;
    })
    .catch((err) => {
      console.error("Error posting job:", err);
      throw err;
    });
};

export const getJobs = () => {
  return getDocs(jobsRef)
    .then((snapshot) => {
      return snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
    })
    .catch((err) => {
      console.error("Error fetching jobs:", err);
      return [];
    });
};

export const subscribeToJobs = (setJobs) => {
  return onSnapshot(jobsRef, (response) => {
    setJobs(response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    })));
  });
};