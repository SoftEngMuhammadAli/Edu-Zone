import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import User from "../../models/users/users_model.js";
import {
  compareAndSecurePassword,
  hashAuthPassword,
  generateToken,
  formatUserResponse,
} from "../../utils/helpers.js";
import { sendEmail } from "../../utils/node_mailer.js";

export const registerUser = catchAsyncHandler(async (req, res) => {
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

  await sendEmail("knowastrickster@gmail.com", email, "send_mail", userData);

  return res.status(201).json({
    message: "User created successfully!",
    token,
    data: userData,
  });
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

// LOGOUT
export const logoutUser = catchAsyncHandler(async (_, res) => {
  res.cookie("token", "", {
    secure: true,
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 0,
  });

  return res.status(200).json({ message: "User logged out successfully!" });
});
