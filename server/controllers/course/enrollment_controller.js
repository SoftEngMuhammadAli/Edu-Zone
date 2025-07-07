import mongoose from "mongoose";
import EnrollmentCourse from "../../models/course/enrollment_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

// Enroll in course
export const enrollInCourse = catchAsyncHandler(async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ error: "User ID and Course ID are required" });
    }

    const existing = await EnrollmentCourse.findOne({ userId, courseId });
    if (existing) {
      return res
        .status(409)
        .json({ error: "User already enrolled in this course" });
    }

    const enrollment = new EnrollmentCourse({ userId, courseId });
    await enrollment.save();

    const populatedEnrollment = await EnrollmentCourse.findById(enrollment._id)
      .populate("courseId", "title description")
      .populate("userId", "name email");

    return res.status(201).json({
      message: `Enrollment successful in course: ${populatedEnrollment.courseId.title}`,
      data: populatedEnrollment,
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});

// Get all courses enrolled by a specific user
export const getEnrolledCoursesByUserId = catchAsyncHandler(
  async (req, res) => {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const enrollments = await EnrollmentCourse.find({ userId })
        .populate("courseId", "title description")
        .populate("userId", "name email");

      if (!enrollments.length) {
        return res.status(404).json({ error: "No enrollments found" });
      }

      return res.status(200).json({
        message: "User's enrolled courses fetched successfully",
        data: enrollments,
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", message: error.message });
    }
  }
);

// Search enrolled students by student name
export const getEnrolledCoursesByStudentName = catchAsyncHandler(
  async (req, res) => {
    try {
      const { name } = req.params;

      const enrollments = await EnrollmentCourse.find()
        .populate({
          path: "userId",
          match: { name: { $regex: name, $options: "i" } },
          select: "name email",
        })
        .populate("courseId", "title description");

      const filtered = enrollments.filter((e) => e.userId !== null);

      if (!filtered.length) {
        return res
          .status(404)
          .json({ error: "No students found with that name" });
      }

      return res.status(200).json({
        message: `Enrollments for student(s) with name: ${name}`,
        data: filtered,
      });
    } catch (error) {
      console.error("Error:", error);
      return res
        .status(500)
        .json({ error: "Server error", message: error.message });
    }
  }
);

// Get all enrolled students
export const getAllEnrolledStudents = catchAsyncHandler(async (req, res) => {
  try {
    const enrollments = await EnrollmentCourse.find()
      .populate("userId", "name email")
      .populate("courseId", "title description");

    if (!enrollments.length) {
      return res.status(404).json({ error: "No enrollments found" });
    }

    return res.status(200).json({
      message: "All enrolled students fetched successfully",
      data: enrollments,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});

// Update enrollment (progress/completed)
export const updateCourseEnrollment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { progress, completed } = req.body;

    const enrollment = await EnrollmentCourse.findByIdAndUpdate(
      id,
      { progress, completed },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    return res.status(200).json({
      message: "Enrollment updated successfully",
      data: enrollment,
    });
  } catch (error) {
    console.error("Error updating enrollment:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});

// Unenroll
export const unEnrollFromCourse = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await EnrollmentCourse.findByIdAndDelete(id);

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    return res.status(200).json({ message: "Unenrollment successful" });
  } catch (error) {
    console.error("Error during unenrollment:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});
