import mongoose from "mongoose";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Lesson from "../../models/course/lesson_model.js";

export const createLesson = catchAsyncHandler(async (req, res) => {
  const { title, content, videoUrl, courseId } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({
      message: "Title is required and should be at least 3 characters long.",
    });
  }

  if (!content || content.trim().length < 10) {
    return res.status(400).json({
      message: "Content is required and should be at least 10 characters long.",
    });
  }

  if (!videoUrl || typeof videoUrl !== "string") {
    return res.status(400).json({
      message: "Valid video URL is required.",
    });
  }

  if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({
      message: "Valid course ID is required.",
    });
  }

  const lesson = new Lesson({
    title: title.trim(),
    content: content.trim(),
    videoUrl,
    courseId,
  });

  await lesson.save();

  return res.status(201).json({
    message: "Lesson created successfully",
    data: lesson,
  });
});

export const getAllLessons = catchAsyncHandler(async (req, res) => {
  const lessons = await Lesson.find().populate("courseId", "title");

  if (!lessons || lessons.length === 0) {
    return res.status(404).json({ message: "No lessons found", data: [] });
  }

  return res.status(200).json({
    message: "Lessons fetched successfully",
    data: lessons,
  });
});

export const getLessonById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid lesson ID" });
  }

  const lesson = await Lesson.findById(id).populate("courseId", "title");

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found", data: null });
  }

  return res.status(200).json({ message: "Lesson fetched", data: lesson });
});

export const updateLesson = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, videoUrl, courseId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid lesson ID" });
  }

  const updateFields = {};
  if (title && title.trim().length >= 3) updateFields.title = title.trim();
  if (content && content.trim().length >= 10)
    updateFields.content = content.trim();
  if (videoUrl && typeof videoUrl === "string")
    updateFields.videoUrl = videoUrl;
  if (courseId && mongoose.Types.ObjectId.isValid(courseId))
    updateFields.courseId = courseId;

  const updated = await Lesson.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return res.status(404).json({ message: "Lesson not found", data: null });
  }

  return res.status(200).json({
    message: "Lesson updated successfully",
    data: updated,
  });
});

export const deleteLesson = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid lesson ID" });
  }

  const deleted = await Lesson.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Lesson not found", data: null });
  }

  return res.status(200).json({
    message: "Lesson deleted successfully",
    data: deleted,
  });
});
