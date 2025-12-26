import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TriggerSearchSimple from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TriggerSearchSimple />
  </StrictMode>
);
