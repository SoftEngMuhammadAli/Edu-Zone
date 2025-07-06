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
import {
  handleGetAllBlogCategories,
  handleGetBlogCategoryById,
  createBlogCategory,
  handleUpdateBlogCategoryById,
  handleDeleteBlogCategoryById,
} from "../../controllers/blog/blog_categories_controller.js";
import { upload } from "../../middlewares/multer.js";

//--///////////////////////////////////////////////
// Blog Routers
//--///////////////////////////////////////////////
router.get("/", checkAuth, handleGetAllBlogs);
router.get("/:id", checkAuth, handleGetBlogById);
router.post(
  "/",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  upload.array("images", 5),
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

//--///////////////////////////////////////////////
// Blog Categories Routers
//--///////////////////////////////////////////////
router.get("/categories", checkAuth, handleGetAllBlogCategories);
router.get("/categories/:id", checkAuth, handleGetBlogCategoryById);
router.post(
  "/categories",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  createBlogCategory
);
router.put(
  "/categories/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleUpdateBlogCategoryById
);
router.delete(
  "/categories/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleDeleteBlogCategoryById
);

export default router;
