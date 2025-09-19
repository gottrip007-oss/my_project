import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Bookings({ token }) {
  const [bookings, setBookings] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [datetime, setDatetime] = useState("");

  useEffect(() => {
    apiRequest("/bookings", "GET", null, token).then(setBookings);
  }, [token]);

  const addBooking = async e => {
    e.preventDefault();
    await apiRequest("/bookings", "POST", { service_id: serviceId, datetime }, token);
    setServiceId(""); setDatetime("");
    apiRequest("/bookings", "GET", null, token).then(setBookings);
  };

  return (
    <div>
      <h3>Bookings</h3>
      <form onSubmit={addBooking}>
        <input placeholder="Service ID" value={serviceId} onChange={e => setServiceId(e.target.value)} required />
        <input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} required />
        <button type="submit">Book</button>
      </form>
      <ul>
        {bookings.map(b => (
          <li key={b._id}>
            Service: {b.service_id}, Date: {b.datetime}, Status: {b.status}
          </li>
        ))}
      </ul>
    </div>
  );
}