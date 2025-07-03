import mongoose from "mongoose";
import CourseCategory from "../../models/course/course_categories_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const handleGetAllCourseCategories = catchAsyncHandler(
  async (req, res) => {
    const categories = await CourseCategory.find({});
    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No course categories found" });
    }

    return res.status(200).json({
      message: "Course categories fetched successfully",
      data: categories,
    });
  }
);

export const handleGetCourseCategoryById = catchAsyncHandler(
  async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    }

    const category = await CourseCategory.findById(id);
    if (!category) {
      return res.status(404).json({ error: "Course category not found" });
    }

    return res.status(200).json({
      message: "Course category fetched successfully",
      data: category,
    });
  }
);

export const createCourseCategory = catchAsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim().length < 3) {
    return res.status(400).json({
      error: "Category name is required and must be at least 3 characters.",
    });
  }

  const trimmedName = name.trim();

  const existingCategory = await CourseCategory.findOne({ name: trimmedName });
  if (existingCategory) {
    return res.status(409).json({ error: "Category name already exists" });
  }

  const newCategory = new CourseCategory({ name: trimmedName });
  await newCategory.save();

  return res.status(201).json({
    message: "Course category created successfully",
    category: newCategory,
  });
});

export const handleUpdateCourseCategoryById = catchAsyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    }

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return res.status(400).json({
        error: "Category name is required and must be at least 3 characters.",
      });
    }

    const trimmedName = name.trim();

    const existing = await CourseCategory.findOne({
      name: trimmedName,
      _id: { $ne: id },
    });
    if (existing) {
      return res
        .status(409)
        .json({ error: "Another category with this name already exists" });
    }

    const updatedCategory = await CourseCategory.findByIdAndUpdate(
      id,
      { name: trimmedName },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Course category not found" });
    }

    return res.status(200).json({
      message: "Course category updated successfully",
      category: updatedCategory,
    });
  }
);

export const handleDeleteCourseCategoryById = catchAsyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Category ID" });
    }

    const deletedCategory = await CourseCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Course category not found" });
    }

    return res.status(200).json({
      message: "Course category deleted successfully",
      category: deletedCategory,
    });
  }
);

export default {
  handleGetAllCourseCategories,
  handleGetCourseCategoryById,
  createCourseCategory,
  handleUpdateCourseCategoryById,
  handleDeleteCourseCategoryById,
};
