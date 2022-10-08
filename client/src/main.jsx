import React from "react";
import ReactDOM from "react-dom/client";
import { TransactionProvider } from "./context/TransactionContext";
import { ContextProvider } from "./context/ContextProvider";
import App from "./App";
import "./index.css";

const lang = "en";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider value = {{}}>
    <TransactionProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TransactionProvider>
  </ContextProvider>
);
