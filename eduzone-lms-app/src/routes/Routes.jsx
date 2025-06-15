import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AboutUs, ContactUs, HeaderNav } from "../components";
import { Help, Home, LoginPage, SeeAllCoursesList, SignUpPage } from "../pages";
import React from "react";

const AppRoutes = () => {
  return (
    <Router>
      <HeaderNav />
      <Routes>
        {/* Main Page Paths */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/seeAllCourses" element={<SeeAllCoursesList />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/help" element={<Help />}></Route>

        {/* Courses Paths */}
        {/* <Route path="/" element={<Home />}></Route> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
