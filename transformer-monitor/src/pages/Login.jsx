import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setMessage("❌ Please verify your email before logging in.");
          return;
        }
        setMessage("✅ Logged in successfully!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        setMessage("✅ Registered! Please check your email to verify.");
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("/Bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      {/* Heading fixed at top */}
      <h1
        style={{
          position: "absolute",
          top: "50px",

          width: "100%",
          textAlign: "center",
          color: "#ffffff",
          fontSize: "36px",
          fontWeight: "bold",
          textShadow: "2px 2px 6px rgba(0,0,0,0.8)",
          padding: 0,
        }}
      >
        Transformer Health Monitoring Portal
      </h1>

      {/* White login box */}
      <div
        style={{
          marginTop: "25px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "40px 35px",
          borderRadius: "25px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.25)",
          width: "380px",
          height: "340px"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#007bff", fontSize: "32px"}}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Enter Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <label style={labelStyle}>Enter Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "18px", textAlign: "center" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
            }}
            style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

        {message && (
          <p style={{ marginTop: "10px", color: message.includes("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "91%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "97%",
  marginTop:"15px",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "6px",
  display: "block",
  fontSize: "15px",
  color: "#333",
};

export default Login;
