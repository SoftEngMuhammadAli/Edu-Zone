import bcrypt from "bcryptjs";

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
