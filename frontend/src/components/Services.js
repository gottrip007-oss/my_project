import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Services({ token }) {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    apiRequest("/services", "GET", null, token).then(setServices);
  }, [token]);

  const addService = async e => {
    e.preventDefault();
    await apiRequest("/services", "POST", { name, price, desc }, token);
    setName(""); setPrice(""); setDesc("");
    apiRequest("/services", "GET", null, token).then(setServices);
  };

  return (
    <div>
      <h3>Services</h3>
      <form onSubmit={addService}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
        <button type="submit">Add Service</button>
      </form>
      <ul>
        {services.map(s => (
          <li key={s._id}>
            {s.name} - ${s.price} : {s.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}