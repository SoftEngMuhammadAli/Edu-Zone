import { configureStore } from "@reduxjs/toolkit";
import authReducer from ".././features/auth/authSlice";
import contactUsReducer from "../features/contact-us/contactUsSlice";
import { blogReducer, blogCategoryReducer } from "../features/admin/blogSlice";
import courseReducer from "../features/admin/courseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contactUs: contactUsReducer,
    blogs: blogReducer,
    blogCategories: blogCategoryReducer,
    course: courseReducer,
  },
});

export default store;
