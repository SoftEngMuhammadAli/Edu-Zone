import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Lesson from "../../models/course/lesson_model.js";

export const createLesson = catchAsyncHandler(async (req, res) => {
  try {
    const lesson = new Lesson(req.body);

    if (!lesson) {
      return res
        .status(400)
        .json({ message: "Invalid lesson data", data: null });
    }

    await lesson.save();
    return res.status(201).json({ message: "Lesson created", data: lesson });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create lesson", error });
  }
});

export const getAllLessons = catchAsyncHandler(async (req, res) => {
  try {
    const lessons = await Lesson.find().populate("courseId", "title");

    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ message: "No lessons found", data: [] });
    }

    return res.status(200).json({ message: "Lessons fetched", data: lessons });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch lessons", error });
  }
});

export const getLessonById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id).populate("courseId", "title");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found", data: null });
    }

    return res.status(200).json({ message: "Lesson fetched", data: lesson });
  } catch (error) {
    return res.status(400).json({ message: "Invalid lesson ID", error });
  }
});

export const updateLesson = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Lesson.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Lesson not found", data: null });
    }

    return res.status(200).json({ message: "Lesson updated", data: updated });
  } catch (error) {
    return res.status(400).json({ message: "Failed to update lesson", error });
  }
});

export const deleteLesson = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Lesson.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Lesson not found", data: null });
    }

    return res.status(200).json({ message: "Lesson deleted", data: deleted });
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete lesson", error });
  }
});
