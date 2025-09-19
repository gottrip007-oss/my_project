import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function Invoices({ token }) {
  const [invoices, setInvoices] = useState([]);
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    apiRequest("/invoices", "GET", null, token).then(setInvoices);
  }, [token]);

  const addInvoice = async e => {
    e.preventDefault();
    await apiRequest("/invoices", "POST", { booking_id: bookingId, amount }, token);
    setBookingId(""); setAmount("");
    apiRequest("/invoices", "GET", null, token).then(setInvoices);
  };

  return (
    <div>
      <h3>Invoices</h3>
      <form onSubmit={addInvoice}>
        <input placeholder="Booking ID" value={bookingId} onChange={e => setBookingId(e.target.value)} required />
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
        <button type="submit">Add Invoice</button>
      </form>
      <ul>
        {invoices.map(i => (
          <li key={i._id}>
            Booking: {i.booking_id}, Amount: ${i.amount}, Status: {i.status}
          </li>
        ))}
      </ul>
    </div>
  );
}