import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, LoginPage, NotFound, SignUpPage } from "../pages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
