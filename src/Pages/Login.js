import React, { useState } from "react";
import "./Login.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userToken = await userCredential.user.getIdToken();
      localStorage.setItem("userToken", userToken);
      navigate("home");
    } catch (error) {
      console.log(error);
    }
  };

  function RegisterOpen() {
    setRegister(false);
  }
  return (
    <div className="loginScreen">
      <span
        style={{
          position: "relative",
          left: "30px",
          top: "40px",
          color: "white",
          fontSize: "56px",
          fontFamily: "serif",
        }}
      >
        React Firebase
      </span>""
      <span
        style={{
          position: "relative",
          left: "30px",
          top: "40px",
          fontSize: "56px",
          fontFamily: "serif",
          color: "red",
        }}
      >
        Demo
      </span>
      {register && (
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="loginButton">
            Login
          </button>
          <div className="link">
            <span style={{color:"white"}}>Dont Have an Account </span>
            <span style={{ backgroundColor:"yellow" }} onClick={RegisterOpen}>
              Register
            </span>
          </div>
        </form>
      )}
      {!register && <Register setRegister={setRegister}></Register>}
    </div>
  );
}

export default Login;
