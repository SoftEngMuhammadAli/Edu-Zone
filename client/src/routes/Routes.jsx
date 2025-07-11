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
import AdminDashboard from "../admin/dashboard/Dashboard";
import LearningRoom from "../components/learning-room/LearningRoom";
import SeeAllEduZoneBenefits from "../components/home/AllBenefits";
import ProtectedRouteWrapper from "../routes/ProtectedRoutes";
import RoleProtectedRouteWrapper from "../routes/RoleProtectedRoutes";
import useAuth from "../hooks/useAuth";
import StudentsListPage from "../admin/pages/students/StudentsList";
import TeachersListPage from "../admin/pages/instructors/Instructors";
import AdminSettingsPage from "../admin/pages/profile/Settings";
import CreateBlogPage from "../admin/pages/blog/CreateBlog";
import UpdateBlogPage from "../admin/pages/blog/UpdateBlog";
import DeleteBlogPage from "../admin/pages/blog/DeleteBlog";
import CreateCoursePage from "../admin/pages/courses/CreateCourse";
import UpdateCoursePage from "../admin/pages/courses/UpdateCourse";
import DeleteCoursePage from "../admin/pages/courses/DeleteCourse";

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
  const { isAuthenticated, user_type } = useAuth();

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
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              user_type === "admin" ? (
                <Navigate to="/admin/dashboard-page" />
              ) : (
                <Navigate to="/learning-room" />
              )
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              user_type === "admin" ? (
                <Navigate to="/admin/dashboard-page" />
              ) : (
                <Navigate to="/learning-room" />
              )
            ) : (
              <SignUpPage />
            )
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/seeAllCourses" element={<SeeAllCoursesList />} />
        <Route path="/see-all-benefits" element={<SeeAllEduZoneBenefits />} />
        <Route path="/help" element={<Help />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/allblogs" element={<ReadAllBlogs />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/coursesuccess" element={<CourseSuccess />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRouteWrapper />}>
          {/* General authenticated routes */}
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin Only */}
          <Route
            element={<RoleProtectedRouteWrapper allowedRoles={["admin"]} />}
          >
            <Route path="/admin/dashboard-page" element={<AdminDashboard />} />
            <Route
              path="/admin/get-all-students"
              element={<StudentsListPage />}
            />
            <Route
              path="/admin/get-all-instructors"
              element={<TeachersListPage />}
            />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/blog/add-blog" element={<CreateBlogPage />} />
            <Route
              path="/admin/blog/update-blog"
              element={<UpdateBlogPage />}
            />
            <Route
              path="/admin/blog/delete-blog"
              element={<DeleteBlogPage />}
            />
          </Route>

          {/* Admin + Instructor Only */}
          <Route
            element={
              <RoleProtectedRouteWrapper
                allowedRoles={["admin", "instructor"]}
              />
            }
          >
            <Route
              path="/courses-management/create-course"
              element={<CreateCoursePage />}
            />
            <Route
              path="/courses-management/update-course"
              element={<UpdateCoursePage />}
            />{" "}
            <Route
              path="/courses-management/delete-course"
              element={<DeleteCoursePage />}
            />
          </Route>

          {/* Student + Instructor Only */}
          <Route
            element={
              <RoleProtectedRouteWrapper
                allowedRoles={["student", "instructor"]}
              />
            }
          >
            <Route path="/learning-room" element={<LearningRoom />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
