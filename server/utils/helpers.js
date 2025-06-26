import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const hashAuthPassword = async (password) => {
  try {
    const mySalt = await bcrypt.genSalt(10);
    const securePassowrd = await bcrypt.hash(password, mySalt);
    return securePassowrd;
  } catch (error) {
    console.error("Error while hashing the password:", error);
    throw new Error("The process of hashing password is failed!");
  }
};

export const compareAndSecurePassword = async (password, hashedPassword) => {
  try {
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    return isValidPassword;
  } catch (error) {
    console.error("Error while comparing passwords:", error);
    throw new Error("The process of comparing passwords failed!");
  }
};

export const generateToken = (user) => {
  const payloadData = {
    userId: user._id,
    user_type: user.user_type,
  };

  return jwt.sign(payloadData, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};
