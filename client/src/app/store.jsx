import { configureStore } from "@reduxjs/toolkit";
import authReducer from ".././features/auth/authSlice";
import contactUsReducer from "../features/contact-us/contactUsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contactUs: contactUsReducer,
  },
});

export default store;
