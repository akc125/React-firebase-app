// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsuyALkiFj2sf48hvBa0T2pABRGYw9QwA",
  authDomain: "porto-bc83c.firebaseapp.com",
  projectId: "porto-bc83c",
  storageBucket: "porto-bc83c.appspot.com",
  messagingSenderId: "840938555551",
  appId: "1:840938555551:web:6492d6500cdc4d93affaaa",
  measurementId: "G-HZC66R9KMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const auth = app.auth();
export default app; 
