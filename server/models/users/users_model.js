import mongoose from "mongoose";
import { getRandomBio } from "../../utils/constants.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
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
      default: "https://avatar.iran.liara.run/public",
    },
    bio: {
      type: String,
      default: () => getRandomBio(),
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema, "auth-users");

/*
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getRandomBio } from "../../utils/constants.js";

// Load from env or config
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "yourRefreshSecret";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
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
      default: "https://avatar.iran.liara.run/public",
    },
    bio: {
      type: String,
      default: () => getRandomBio(),
      maxlength: 1000,
    },

    // Token-related
    refresh_token: {
      type: String,
      default: null,
    },
    token_version: {
      type: Number,
      default: 0,
    },
    last_login: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


 * 🔐 Instance Method: Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      user_type: this.user_type,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // adjust as needed
  );
};

 * 🔐 Instance Method: Generate and Store Hashed Refresh Token
userSchema.methods.generateRefreshToken = async function () {
  const token = jwt.sign(
    {
      id: this._id,
      token_version: this.token_version,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  const hashedToken = await bcrypt.hash(token, 10);
  this.refresh_token = hashedToken;
  await this.save();

  return token; // Return raw token to client, store hashed in DB
};

 * 🔐 Static Method: Verify Refresh Token
userSchema.statics.verifyRefreshToken = async function (userId, token) {
  const user = await this.findById(userId);
  if (!user || !user.refresh_token) return false;

  const match = await bcrypt.compare(token, user.refresh_token);
  return match ? user : null;
};

 * 🚪 Invalidate Tokens (Logout)
userSchema.methods.invalidateTokens = async function () {
  this.token_version += 1;
  this.refresh_token = null;
  await this.save();
};

export default mongoose.model("User", userSchema, "auth-users");
*/
