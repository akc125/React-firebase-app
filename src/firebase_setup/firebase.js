// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNUEXE5dVm2QnKxYSK8MGOVkK5ax5Rumw",
  authDomain: "apples-680b8.firebaseapp.com",
  projectId: "apples-680b8",
  storageBucket: "apples-680b8.appspot.com",
  messagingSenderId: "69868284908",
  appId: "1:69868284908:web:e59cc482f5de19a3a8aec9",
  measurementId: "G-W7PM619YYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const auth = app.auth();
export default app; 
