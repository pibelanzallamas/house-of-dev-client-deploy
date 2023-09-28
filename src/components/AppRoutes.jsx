import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import Property from "./Property";
import Users from "./Users";
import Properties from "./Properties";
import CreateProp from "./CreateProp";
import CreateAppo from "./CreateAppo";
import Appointments from "./Appointments";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/properties/:id" element={<Property />} />
      <Route path="/users/" element={<Users />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/properties/register" element={<CreateProp />} />
      <Route path="/appointments/register/:id" element={<CreateAppo />} />
    </Routes>
  );
}

export default AppRoutes;
