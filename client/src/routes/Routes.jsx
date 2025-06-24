import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import AboutUs from "../components/about/AboutUs";
import ContactUs from "../components/contact/ContactUs";
import CourseSuccess from "../components/courses/CourseSuccess";
import HeaderNav from "../components/home/HeaderNav";
import CourseDetail from "../pages/courses/CourseDetails";
import Help from "../pages/help/Help";
import Home from "../pages/home/Home";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import SeeAllCoursesList from "../pages/courses/AllCourses";
import ReadAllBlogs from "../pages/blogs/AllBlogs";
import NotFound from "../pages/home/NotFound";

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();

  const HIDE_NAVBAR_PATHS = [
    "/login",
    "/signup",
    "/coursesuccess",
    "/notfound",
  ];

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
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/allblogs" element={<ReadAllBlogs />} />

        {/* Courses Paths */}
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/coursesuccess" element={<CourseSuccess />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
