import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./contexts/AuthProvider";
import { ChatGptProvider } from "./contexts/ChatGptContext";
import firebase from "./firebase.js";
import "../src/css/video.css"


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <AuthProvider>
        <ChatGptProvider>
          <App />
        </ChatGptProvider>
      </AuthProvider>
  </React.StrictMode>
);

