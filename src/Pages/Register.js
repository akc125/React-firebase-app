import React, { useState } from "react";
import "./Register.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register({ setRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
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
