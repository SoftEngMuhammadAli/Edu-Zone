import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { AboutUs, ContactUs, CourseSuccess, HeaderNav } from "../components";
import {
  CourseDetails,
  Help,
  Home,
  LoginPage,
  SeeAllCoursesList,
  SignUpPage,
} from "../pages";

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

// This component handles layout conditionally
const MainLayout = () => {
  const location = useLocation();

  const HIDE_NAVBAR_PATHS = ["/login", "/signup", "/coursesuccess"];

  const hideNavbar = HIDE_NAVBAR_PATHS.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <HeaderNav />}
      <Routes>
        {/* Main Page Paths */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/seeAllCourses" element={<SeeAllCoursesList />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />

        {/* Courses Paths */}
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/coursesuccess" element={<CourseSuccess />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
