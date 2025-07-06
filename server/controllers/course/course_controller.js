import mongoose from "mongoose";
import Course from "../../models/course/course_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

export const getAllCourses = catchAsyncHandler(async (req, res) => {
  const courses = await Course.find({})
    .populate("user", "name email")
    .populate("lesson")
    .populate("assignment");

  if (!courses || courses.length === 0) {
    return res.status(404).json({ message: "No courses found." });
  }

  return res.status(200).json({
    message: "Courses fetched successfully!",
    data: courses,
  });
});

export const getCourseById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Course ID" });
  }

  const course = await Course.findById(id)
    .populate("user", "name email")
    .populate("lesson")
    .populate("assignment");

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  return res.status(200).json({ message: "Course found", data: course });
});

export const createCourse = catchAsyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    duration,
    level,
    views = 0,
    students = 0,
    rating = 1,
    assignment = null,
    lesson = null,
  } = req.body;

  const user = req.user?.userId;
  const imageFiles = req.files?.map((file) => file.filename) || [];

  if (!title || title.trim().length < 3) {
    return res
      .status(400)
      .json({ message: "Title must be at least 3 characters." });
  }

  if (!description || description.trim().length < 10) {
    return res
      .status(400)
      .json({ message: "Description must be at least 10 characters." });
  }

  if (!category || !mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({ message: "Valid category ID is required." });
  }

  if (!duration || typeof duration !== "string") {
    return res.status(400).json({ message: "Duration is required." });
  }

  if (!level || !["Beginner", "Intermediate", "Advanced"].includes(level)) {
    return res
      .status(400)
      .json({ message: "Level must be Beginner, Intermediate, or Advanced." });
  }

  const newCourse = new Course({
    title: title.trim(),
    description: description.trim(),
    category,
    views,
    students,
    rating,
    duration,
    level,
    user,
    assignment,
    lesson,
    images: imageFiles,
  });

  await newCourse.save();

  return res.status(201).json({
    message: "Course created successfully",
    data: newCourse,
  });
});

export const updateCourseById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Course ID" });
  }

  const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCourse) {
    return res.status(404).json({ error: "Course not found" });
  }

  return res.status(200).json({
    message: "Course updated successfully",
    data: updatedCourse,
  });
});

export const deleteCourseById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Course ID" });
  }

  const deletedCourse = await Course.findByIdAndDelete(id);

  if (!deletedCourse) {
    return res.status(404).json({ error: "Course not found" });
  }

  return res.status(200).json({
    message: "Course deleted successfully",
    data: deletedCourse,
  });
});

export default {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
};
