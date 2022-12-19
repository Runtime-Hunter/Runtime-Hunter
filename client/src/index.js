import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { StoreProvider } from "./store/store";
import { initialState, userReducer } from "./store/userReducer";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider
        initialState={initialState}
        reducer={userReducer}
      >
        <App />
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
