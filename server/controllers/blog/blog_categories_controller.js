import mongoose from "mongoose";
import BlogCategory from "../../models/blog/blog_category_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const handleGetAllBlogCategories = catchAsyncHandler(
  async (req, res) => {
    try {
      const categories = await BlogCategory.find({});
      if (!categories || categories.length === 0) {
        return res.status(404).json({ message: "No blog categories found" });
      }
      return res.status(200).json({
        message: "Blog categories fetched successfully",
        data: categories,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Failed to fetch blog categories",
        details: err.message,
      });
    }
  }
);

export const handleGetBlogCategoryById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Category ID" });
  }

  try {
    const category = await BlogCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Blog category not found" });
    }
    return res.status(200).json({
      message: "Blog category fetched successfully",
      data: category,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch blog category",
      details: err.message,
    });
  }
});

export const createBlogCategory = catchAsyncHandler(async (req, res) => {
  const { name } = req.body;
  try {
    const existingCategory = await BlogCategory.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name already exists" });
    }

    const newCategory = new BlogCategory({ name: name.trim() });
    await newCategory.save();

    return res.status(201).json({
      message: "Blog category created successfully",
      category: newCategory,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to create blog category",
      details: err.message,
    });
  }
});

export const handleUpdateBlogCategoryById = catchAsyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    }

    try {
      const updatedCategory = await BlogCategory.findByIdAndUpdate(
        id,
        { name: name.trim() },
        { new: true, runValidators: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ error: "Blog category not found" });
      }

      return res.status(200).json({
        message: "Blog category updated successfully",
        category: updatedCategory,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Failed to update blog category",
        details: err.message,
      });
    }
  }
);

export const handleDeleteBlogCategoryById = catchAsyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    }

    try {
      const deletedCategory = await BlogCategory.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ error: "Blog category not found" });
      }

      return res.status(200).json({
        message: "Blog category deleted successfully",
        category: deletedCategory,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Failed to delete blog category",
        details: err.message,
      });
    }
  }
);

export default {
  handleGetAllBlogCategories,
  handleGetBlogCategoryById,
  createBlogCategory,
  handleUpdateBlogCategoryById,
  handleDeleteBlogCategoryById,
};
