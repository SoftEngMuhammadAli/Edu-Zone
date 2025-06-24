import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      enum: ["student", "instructor", "admin"],
      default: "student",
    },
    registration_date: {
      type: Date,
      default: Date.now,
    },
    profile_picture_url: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema, "users");
