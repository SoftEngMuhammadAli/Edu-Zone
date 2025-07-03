import User from "../../models/users/users_model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const handleGetAllUsers = catchAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0) {
      res.status(404).json({ message: "Oops! No users found." });
    } else {
      res.status(200).json({
        message: "All users fetched successfully.",
        data: users,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching users.",
      error: error.message,
    });
  }
});

export const handleGetAllUsersByRole = catchAsyncHandler(async (req, res) => {
  try {
    const role = req.params.role;
    if (!role) {
      res.status(400).json({ message: "Role parameter is required" });
    } else {
      const usersByRole = await User.find({ user_type: role });
      if (!usersByRole || usersByRole.length === 0) {
        res.status(404).json({ message: `No users found with role: ${role}` });
      } else {
        res.status(200).json({
          message: `Users with role "${role}" fetched successfully`,
          data: usersByRole,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users by role",
      error: error.message,
    });
  }
});

export const createUser = catchAsyncHandler(async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      user_type,
      profile_picture_url,
      bio,
    } = req.body;

    if (!username || !email || !password || !first_name || !last_name) {
      res.status(400).json({ message: "Please provide all required fields." });
    } else {
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        res.status(409).json({ message: "Username or email already taken." });
      } else {
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
          username,
          email,
          password_hash,
          first_name,
          last_name,
          user_type,
          profile_picture_url,
          bio,
        });

        await newUser.save();

        res
          .status(201)
          .json({ message: "User created successfully", user: newUser });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

export const handleGetUserById = catchAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "_id parameter is required" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ObjectId format" });
    } else {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ message: `No user found with _id: ${id}` });
      } else {
        res.status(200).json({
          message: `User with _id: ${id} fetched successfully!`,
          data: user,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user by _id",
      error: error.message,
    });
  }
});

export const handleDeleteUserById = catchAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ message: "_id parameter is required" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ObjectId format" });
    } else {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        res.status(404).json({ message: `No user found with _id: ${id}` });
      } else {
        res.status(200).json({
          message: `User with _id: ${id} deleted successfully.`,
          data: deletedUser,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user by _id",
      error: error.message,
    });
  }
});

export const handleUpdateUserById = catchAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid _id format" });
    } else if (!updateData || Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "Update data is required" });
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedUser) {
        res.status(404).json({ message: `User with _id: ${id} not found` });
      } else {
        res.status(200).json({
          message: `User with _id: ${id} updated successfully`,
          data: updatedUser,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating user by _id",
      error: error.message,
    });
  }
});
