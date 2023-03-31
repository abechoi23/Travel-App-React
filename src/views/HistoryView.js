import React from "react";
import NavbarPage from "../components/Navbar";
import History from "../components/History";
import "../css/history.css"

export default function HistoryView() {

  return (
    <>
    <NavbarPage />
    <div className="historyForm">
      <h2>Saved Trips</h2>
      <History/>
    </div>
    </>
  );
}
