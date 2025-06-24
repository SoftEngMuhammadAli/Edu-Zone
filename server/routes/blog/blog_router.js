import express from "express";
const router = express.Router();
import {
  handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById,
} from "../../controllers/blog/blog_controller.js";

router.get("/all", handleGetAllBlogs);

router.get("/:id", handleGetBlogById);

router.post("/create", handleCreateBlog);

router.put("/:id", handleUpdateBlogById);

router.delete("/:id", handleDeleteBlogById);

export default router;
