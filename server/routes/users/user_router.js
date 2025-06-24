import express from "express";
import {
  handleGetAllUsers,
  handleGetAllUsersByRole,
  createUser,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
} from "../../controllers/users/users_controller.js";

const router = express.Router();

router.get("/all", handleGetAllUsers);
router.get("/role/:role", handleGetAllUsersByRole);
router.get("/:id", handleGetUserById);

router.post("/create", createUser);

router.put("/:id", handleUpdateUserById);

router.delete("/:id", handleDeleteUserById);

export default router;
