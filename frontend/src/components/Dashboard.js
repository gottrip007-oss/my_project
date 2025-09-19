import React from "react";
import Services from "./services";
import Bookings from "./Bookings";
import Invoices from "./Invoices";
import Chatbot from "./Chatbot";

export default function Dashboard({ token, role }) {
  return (
    <div>
      <h2>Dashboard</h2>
      {role === "owner" || role === "staff" ? (
        <>
          <Services token={token} />
          <Bookings token={token} />
          <Invoices token={token} />
        </>
      ) : (
        <>
          <Bookings token={token} />
          <Invoices token={token} />
        </>
      )}
      <Chatbot token={token} />
    </div>
  );
}