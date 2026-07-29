import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { SsrDataContext } from "./ssrData";
import "./index.css";

const initialData = window.__INITIAL_DATA__ || {};

hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SsrDataContext.Provider value={initialData}>
          <App />
        </SsrDataContext.Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
