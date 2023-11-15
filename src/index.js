import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import { configureFakeBackend } from "./_helpers/configureFakeBackend";
import { BrowserRouter } from "react-router-dom";
configureFakeBackend();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
