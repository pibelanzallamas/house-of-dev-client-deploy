import React, { useEffect } from "react";
import AppRoutes from "./components/AppRoutes";
import { Analytics } from "@vercel/analytics/react";
import "./styles/App.css";
import { useDispatch } from "react-redux";
import { setUser } from "./state/userState";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function repartingData() {
      try {
        const data = await JSON.parse(localStorage.getItem("user"));
        await dispatch(setUser(data));
      } catch (err) {
        console.log(err);
      }
    }
    repartingData();
  }, []);

  return (
    <div>
      <Analytics />
      <AppRoutes />
    </div>
  );
}

export default App;
