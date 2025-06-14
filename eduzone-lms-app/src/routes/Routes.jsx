import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, LoginPage, SignUpPage } from "../pages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Main Page Paths */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>

        {/* Courses Paths */}
        {/* <Route path="/" element={<Home />}></Route> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
