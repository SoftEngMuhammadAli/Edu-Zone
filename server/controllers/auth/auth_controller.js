import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import User from "../../models/users/users_model.js";
import {
  compareAndSecurePassword,
  hashAuthPassword,
  generateToken,
} from "../../utils/helpers.js";
import { sendEmail } from "../../utils/node_mailer.js";

export const registerUser = catchAsyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    } else if (!email) {
      return res.status(400).json({ message: "Email is required" });
    } else if (!password) {
      return res.status(400).json({ message: "Password is required" });
    } else {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already Exists!" });
      } else {
        const hashedPassword = await hashAuthPassword(password);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
        });

        await newUser.save();

        const token = generateToken(newUser);

        // Exclude password field
        const userData = newUser.toObject();
        delete userData.password;

        // TODO: User Approval Registration
        await sendEmail(
          "knowastrickster@gmail.com",
          email,
          "send_mail",
          userData
        );

        return res.status(201).json({
          message: "User is Created, Successfully!",
          token: token,
          data: userData,
        });
      }
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const loginUser = catchAsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    } else if (!password) {
      return res.status(400).json({ message: "Password is required" });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      } else {
        const isPasswordValid = await compareAndSecurePassword(
          password,
          user.password
        );
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid email or password" });
        } else {
          const token = generateToken(user);

          // Exclude password field from user object
          const userData = { ...user.toJSON() };
          delete userData.password;

          res.cookie("token", token, {
            httpOnly: true,
            sameSite: "Strict",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });

          return res.status(200).json({
            message: "User Logged In, Successfully!",
            token: token,
            user: userData,
          });
        }
      }
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export const logoutUser = catchAsyncHandler(async (_, res) => {
  try {
    res.cookie("token", "", {
      secure: true,
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 0,
    });

    return res.status(200).json({ message: "User Logged Out, Successfully!" });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
