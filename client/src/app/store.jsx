import { configureStore } from "@reduxjs/toolkit";
import authReducer from ".././features/auth/authSlice";
import contactUsReducer from "../features/contact-us/contactUsSlice";
import blogReducer from "../features/admin/blogSlice";
import courseReducer from "../features/admin/courseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contactUs: contactUsReducer,
    blog: blogReducer,
    course: courseReducer,
  },
});

export default store;
