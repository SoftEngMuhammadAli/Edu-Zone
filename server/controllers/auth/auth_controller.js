import User from "../../models/users/users_model.js";
import {
  compareAndSecurePassword,
  hashAuthPassword,
  generateToken,
} from "../../utils/helpers.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already Exists!" });
    }

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

    return res.status(201).json({
      message: "User is Created, Successfully!",
      token: token,
      data: userData,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await compareAndSecurePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    // Exclude password field from user object
    const userData = { ...user.toJSON() };
    delete userData.password;

    return res.status(200).json({
      message: "User Logged In, Successfully!",
      token: token,
      user: userData,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
