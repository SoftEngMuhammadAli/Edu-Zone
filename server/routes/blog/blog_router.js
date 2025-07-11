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
// Blog Categories Routes
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

//--///////////////////////////////////////////////
// Blog Routes
//--///////////////////////////////////////////////
router.get("/", checkAuth, handleGetAllBlogs);

router.post(
  "/",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  upload.array("images", 5),
  (req, res, next) => {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);
    next();
  },
  handleCreateBlog
);

router.get("/:id", checkAuth, handleGetBlogById);
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  upload.array("images", 5),
  (req, res, next) => {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);
    next();
  },
  handleUpdateBlogById
);
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleDeleteBlogById
);

export default router;
