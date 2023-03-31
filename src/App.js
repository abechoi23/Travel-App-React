import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import HistoryView from "./views/HistoryView";
import Signup from "./views/Signup";
import Login from "./views/Login";
import video from "./background/background3.mp4";

function App() {
  return (
    <>
      <div>
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/savedtrips" element={<HistoryView />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
