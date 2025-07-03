import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  Navigate,
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
import TermsAndConditions from "../components/terms-and-conditions/TermsAndConditions";
import PrivacyPolicy from "../components/privacy-policy/PrivacyPolicy";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  // const { isAuthenticated } = useAuth();

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
        <Route path="/home" element={<Home />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            // isAuthenticated ? <Navigate to="/home" /> :
            <LoginPage />
          }
        />
        <Route
          path="/signup"
          element={
            // isAuthenticated ? <Navigate to="/home" /> :
            <SignUpPage />
          }
        />

        {/* Content Routes */}
        <Route path="/seeAllCourses" element={<SeeAllCoursesList />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/allblogs" element={<ReadAllBlogs />} />

        {/* Course Routes */}
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/coursesuccess" element={<CourseSuccess />} />

        {/* Error Handling */}
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
