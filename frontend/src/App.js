import React, { useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);

  if (!token) {
    return <Auth setToken={setToken} setRole={setRole} setName={setName} />;
  }

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <button onClick={() => { setToken(null); setRole(null); setName(null); }}>Logout</button>
      <Dashboard token={token} role={role} />
    </div>
  );
}

export default App;