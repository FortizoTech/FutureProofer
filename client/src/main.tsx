import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { UserProvider } from "./context/user-context";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
