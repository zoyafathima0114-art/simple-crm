import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="card" style={{ width: "360px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Simple CRM
        </h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p style={{ color: "#b91c1c", fontSize: "13px" }}>{error}</p>
        )}

        <button
          className="primary"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={handleLogin}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "15px",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          New user?{" "}
          <Link to="/signup" style={{ color: "#2563eb" }}>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
