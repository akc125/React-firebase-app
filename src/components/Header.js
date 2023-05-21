import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

function Header() {
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyBsuyALkiFj2sf48hvBa0T2pABRGYw9QwA",
    authDomain: "porto-bc83c.firebaseapp.com",
    projectId: "porto-bc83c",
    storageBucket: "porto-bc83c.appspot.com",
    messagingSenderId: "840938555551",
    appId: "1:840938555551:web:6492d6500cdc4d93affaaa",
    measurementId: "G-HZC66R9KMZ",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // Logout
  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem('userToken');
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header">
      <span className="heading">React Firebase </span>
      <span className="demo">Demo</span>
      <span
        style={{
          fontSize: "18px",
          color: "white",
          position: "relative",
          left: "200px",
          top: "40px",
          fontFamily:"serif",
          cursor:"pointer",
        }}
        onClick={() => navigate("home")}
      >
        Home
      </span>
      <span
        style={{
          fontSize: "18px",
          fontFamily:"serif",
          color: "white",
          position: "relative",
          left: "250px",
          top: "40px",
          cursor:"pointer",
        }}
        onClick={() => navigate("about")}
      >
        About
      </span>
      <span
        style={{
          fontSize: "18px",
          color: "white",
          position: "relative",
          left: "300px",
          top: "40px",
          fontFamily:"serif",
          cursor:"pointer",
          color:"red",
        }}
        onClick={() => {
          logout();
        }}
      >
        Logout
      </span>
    </div>
  );
}

export default Header;
