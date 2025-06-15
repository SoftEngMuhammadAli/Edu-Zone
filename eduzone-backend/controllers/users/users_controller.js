const User = require("../../models/users/users_model.js");
const bcrypt = require("bcrypt");

async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find({});

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Oops! No users found." });
    }

    return res.status(200).json({
      message: "All users fetched successfully.",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching users.",
      error: error.message,
    });
  }
}

async function handleGetAllUsersByRole(req, res) {
  try {
    const role = req.params.role;

    if (!role) {
      return res.status(400).json({ message: "Role parameter is required" });
    }

    const usersByRole = await User.find({ user_type: role });

    if (!usersByRole || usersByRole.length === 0) {
      return res
        .status(404)
        .json({ message: `No users found with role: ${role}` });
    }

    return res.status(200).json({
      message: `Users with role "${role}" fetched successfully`,
      data: usersByRole,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching users by role",
      error: error.message,
    });
  }
}

async function createUser(req, res) {
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

    // Basic validation (you can improve this with Joi or express-validator)
    if (!username || !email || !password || !first_name || !last_name) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already taken." });
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = new User({
      username,
      email,
      password_hash,
      first_name,
      last_name,
      user_type, // optional, default is 'student'
      profile_picture_url,
      bio,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
}

async function handleGetUserById(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "_id parameter is required" });
    }

    // Optional: Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: `No user found with _id: ${id}` });
    }

    return res.status(200).json({
      message: `User with _id: ${id} fetched successfully!`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user by _id",
      error: error.message,
    });
  }
}

async function handleDeleteUserById(req, res) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "_id parameter is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: `No user found with _id: ${id}` });
    }

    return res.status(200).json({
      message: `User with _id: ${id} deleted successfully.`,
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting user by _id",
      error: error.message,
    });
  }
}

async function handleUpdateUserById(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid _id format" });
    }

    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: `User with _id: ${id} not found` });
    }

    return res.status(200).json({
      message: `User with _id: ${id} updated successfully`,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating user by _id",
      error: error.message,
    });
  }
}

// Exports
module.exports = {
  handleGetAllUsers,
  handleGetAllUsersByRole,
  createUser,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
};
