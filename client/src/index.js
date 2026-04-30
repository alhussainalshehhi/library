import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import BorrowProvider from "./context/BorrowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BorrowProvider>
    <App />
  </BorrowProvider>
);