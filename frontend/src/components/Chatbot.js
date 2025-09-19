import React, { useState } from "react";
import { apiRequest } from "../api";

export default function Chatbot({ token }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    setMessages([...messages, { from: "user", text: input }]);
    const res = await apiRequest("/chatbot", "POST", { message: input }, token);
    setMessages([...messages, { from: "user", text: input }, { from: "bot", text: res.response }]);
    setInput("");
  };

  return (
    <div>
      <h3>Chatbot Assistant</h3>
      <div style={{ border: "1px solid #ccc", padding: 10, minHeight: 100 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.from === "user" ? "right" : "left" }}>
            <strong>{msg.from === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}