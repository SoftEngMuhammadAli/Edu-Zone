import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Assignment from "../../models/course/asssingment_model.js";

export const createAssignment = catchAsyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, courseId, lessonId } = req.body || {};

    // Early check for completely missing or empty body
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Object.keys(req.body).length === 0
    ) {
      return res.status(400).json({
        message: "Request body is missing or empty.",
        data: null,
      });
    }

    // Log incoming body for debugging
    console.log("Creating assignment:", {
      title,
      description,
      dueDate,
      courseId,
      lessonId,
    });

    // Field validations
    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        message: "Title is required and must be at least 3 characters.",
        data: null,
      });
    }

    if (!description || description.trim().length < 10) {
      return res.status(400).json({
        message: "Description is required and must be at least 10 characters.",
        data: null,
      });
    }

    if (!dueDate || isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        message: "A valid due date is required.",
        data: null,
      });
    }

    if (!courseId || typeof courseId !== "string") {
      return res.status(400).json({
        message: "Valid courseId is required.",
        data: null,
      });
    }

    if (!lessonId || typeof lessonId !== "string") {
      return res.status(400).json({
        message: "Valid lessonId is required.",
        data: null,
      });
    }

    // Create and save assignment
    const assignment = new Assignment({
      title: title.trim(),
      description: description.trim(),
      dueDate: new Date(dueDate),
      courseId,
      lessonId,
    });

    await assignment.save();

    return res.status(201).json({
      message: "Assignment created successfully",
      data: assignment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create assignment",
      error: error.message || error,
    });
  }
});

export const getAllAssignments = catchAsyncHandler(async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("courseId", "title")
      .populate("lessonId", "title");

    if (!assignments || assignments.length === 0) {
      return res
        .status(404)
        .json({ message: "No assignments found", data: [] });
    }

    return res
      .status(200)
      .json({ message: "Assignments fetched", data: assignments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch assignments", error });
  }
});

export const getAssignmentById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findById(id)
      .populate("courseId", "title")
      .populate("lessonId", "title");

    if (!assignment) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    return res
      .status(200)
      .json({ message: "Assignment fetched", data: assignment });
  } catch (error) {
    return res.status(400).json({ message: "Invalid assignment ID", error });
  }
});

export const updateAssignment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    return res
      .status(200)
      .json({ message: "Assignment updated", data: updated });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to update assignment", error });
  }
});

export const deleteAssignment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Assignment.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Assignment not found", data: null });
    }

    return res
      .status(200)
      .json({ message: "Assignment deleted", data: deleted });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to delete assignment", error });
  }
});
