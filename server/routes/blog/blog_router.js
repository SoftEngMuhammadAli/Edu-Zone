import express from "express";
const router = express.Router();
import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";
import {
  handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById,
} from "../../controllers/blog/blog_controller.js";

router.get("/all", checkAuth, handleGetAllBlogs);

router.get("/:id", checkAuth, handleGetBlogById);

router.post(
  "/create",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleCreateBlog
);

router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleUpdateBlogById
);

router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleDeleteBlogById
);

export default router;
