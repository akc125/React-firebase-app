import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

function Register({ setRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      setRegister(true);
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  function LoginOpen() {
    setRegister(true);
  }
  return (
    <div>
      {" "}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group2">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="registerButton">
          Register
        </button>
        <div className="link">
          <span style={{color:"white"}}>Already Registered </span>
          <span style={{ color: "pink" }} onClick={LoginOpen}>
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
