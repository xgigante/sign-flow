import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("El nodo 'root' no existe en el HTML.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer toastClassName="text-sm" bodyClassName="text-sm" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
