import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import User from "../../models/users/users_model.js";
import {
  compareAndSecurePassword,
  hashAuthPassword,
  generateToken,
  formatUserResponse,
} from "../../utils/helpers.js";
import { sendEmail } from "../../utils/node_mailer.js";
import Notification from "../../models/notifications/notification_model.js";

export const registerUser = catchAsyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await hashAuthPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = generateToken(newUser);
    const userData = formatUserResponse(newUser);

    try {
      await sendEmail(email, "Welcome to EduZone", "send_mail", userData);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    try {
      await Notification.create({
        userId: newUser._id,
        message: `Welcome ${newUser.name}! Your account has been created.`,
        type: "info",
        link: `/dashboard`,
      });

      await Notification.create({
        userId: null,
        message: `New user signed up: ${newUser.name}`,
        type: "user",
        link: `/admin/users/${newUser._id}`,
      });
    } catch (notificationError) {
      console.error("Notification creation failed:", notificationError.message);
    }

    return res.status(201).json({
      message: "User created successfully!",
      token,
      data: userData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

export const loginUser = catchAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const isValid = await compareAndSecurePassword(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const token = generateToken(user);
  const userData = formatUserResponse(user);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "User logged in successfully!",
    token,
    user: userData,
  });
});

export const logoutUser = catchAsyncHandler(async (_, res) => {
  res.cookie("token", "", {
    secure: true,
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 0,
  });

  return res.status(200).json({ message: "User logged out successfully!" });
});

export const getUserProfile = catchAsyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({
      message: "User profile fetched successfully.",
      data: formatUserResponse(user),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch user profile.",
      error: error.message,
    });
  }
});
