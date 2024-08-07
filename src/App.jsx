import React from "react";
import AppRoutes from "./components/AppRoutes";
import { Analytics } from "@vercel/analytics/react";
import "./styles/App.css";

function App() {
  return (
    <div>
      <Analytics />
      <AppRoutes />
    </div>
  );
}

export default App;
