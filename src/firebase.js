// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxIAsEF3ma0MxNZwfO-NP1j7RbN3SFfbc",
  authDomain: "italian-stitch-b0a04.firebaseapp.com",
  projectId: "italian-stitch-b0a04",
  storageBucket: "italian-stitch-b0a04.appspot.com",
  messagingSenderId: "531086625453",
  appId: "1:531086625453:web:44f1684e8f323353399424",
  measurementId: "G-17N3YZ59KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);