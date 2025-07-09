import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  console.log("Protected Route Rendered");
  const token = localStorage.getItem("token");
  console.log("Check Token in Protected Route: >>", token);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
