import express from "express";
import {
  handleGetAllUsers,
  handleGetAllUsersByRole,
  createUser,
  handleGetUserById,
  handleDeleteUserById,
  handleUpdateUserById,
} from "../../controllers/auth/users_controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.get("/", checkAuth, authorizeRoles("admin"), handleGetAllUsers);

router.get(
  "/role/:role",
  checkAuth,
  authorizeRoles("admin"),
  handleGetAllUsersByRole
);

router.get("/:id", checkAuth, authorizeRoles("admin"), handleGetUserById);

router.post("/", checkAuth, authorizeRoles("admin"), createUser);

router.put("/:id", checkAuth, authorizeRoles("admin"), handleUpdateUserById);

router.delete("/:id", checkAuth, authorizeRoles("admin"), handleDeleteUserById);

export default router;
