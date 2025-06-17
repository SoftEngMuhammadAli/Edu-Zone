const express = require("express");
const router = express.Router();
const {
  handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById,
} = require("../../controllers/blog/blog_controller");

router.get("/all", handleGetAllBlogs);

router.get("/:id", handleGetBlogById);

router.post("/create", handleCreateBlog);

router.put("/:id", handleUpdateBlogById);

router.delete("/:id", handleDeleteBlogById);

module.exports = router;
