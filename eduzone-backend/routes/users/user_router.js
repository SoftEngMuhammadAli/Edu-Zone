const express = require("express");
const {
  handleGetAllUsers,
  handleGetAllUsersByRole,
  createUser,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
} = require("../../controllers/users/users_controller");
const router = express.Router();

router.get("/all", handleGetAllUsers);
router.get("/role/:role", handleGetAllUsersByRole);
router.get("/:id", handleGetUserById);

router.post("/create", createUser);

router.put("/:id", handleUpdateUserById);

router.delete("/:id", handleDeleteUserById);

module.exports = router;
