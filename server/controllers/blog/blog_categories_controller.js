import mongoose from "mongoose";
import BlogCategory from "../../models/blog/blog_category_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const handleGetAllBlogCategories = catchAsyncHandler(
  async (req, res) => {
    const categories = await BlogCategory.find({});
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No blog categories found" });
    } else {
      return res.status(200).json({
        message: "Blog categories fetched successfully",
        data: categories,
      });
    }
  }
);

export const handleGetBlogCategoryById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "Category ID is required" });
  } else if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Category ID" });
  } else {
    const category = await BlogCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Blog category not found" });
    } else {
      return res.status(200).json({
        message: "Blog category fetched successfully",
        data: category,
      });
    }
  }
});

export const createBlogCategory = catchAsyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Category name is required" });
  } else {
    const existingCategory = await BlogCategory.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name already exists" });
    } else {
      const newCategory = new BlogCategory({ name: name.trim() });
      await newCategory.save();
      return res.status(201).json({
        message: "Blog category created successfully",
        category: newCategory,
      });
    }
  }
});

export const handleUpdateBlogCategoryById = catchAsyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    } else if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Category name is required" });
    } else {
      const updatedCategory = await BlogCategory.findByIdAndUpdate(
        id,
        { name: name.trim() },
        { new: true, runValidators: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ error: "Blog category not found" });
      } else {
        return res.status(200).json({
          message: "Blog category updated successfully",
          category: updatedCategory,
        });
      }
    }
  }
);

export const handleDeleteBlogCategoryById = catchAsyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    } else if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    } else {
      const deletedCategory = await BlogCategory.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ error: "Blog category not found" });
      } else {
        return res.status(200).json({
          message: "Blog category deleted successfully",
          category: deletedCategory,
        });
      }
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
