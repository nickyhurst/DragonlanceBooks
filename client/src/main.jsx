import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const { Workbox } = await import("workbox-window");
    const wb = new Workbox("/sw.js");
    wb.register();
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);