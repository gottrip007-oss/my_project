import React, { useState } from "react";
import { apiRequest } from "../api";

export default function Auth({ setToken, setRole, setName }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setNameInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    if (isLogin) {
      const res = await apiRequest("/login", "POST", { email, password });
      if (res.token) {
        setToken(res.token);
        setRole(res.role);
        setName(res.name);
      } else {
        setError(res.msg || "Login failed");
      }
    } else {
      const res = await apiRequest("/register", "POST", { email, password, name: name });
      if (res.token) {
        setToken(res.token);
        setRole("customer");
        setName(name);
      } else {
        setError(res.msg || "Registration failed");
      }
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setNameInput(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}