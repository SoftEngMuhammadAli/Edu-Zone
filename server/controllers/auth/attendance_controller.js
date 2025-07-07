import express from "express";
import Attendance from "../../models/users/attendance_model.js";
import Course from "../../models/course/course_model.js";
import User from "../../models/users/users_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

const router = express.Router();

export const markAttendance = catchAsyncHandler(async (req, res) => {
  try {
    const { studentId, courseId, status, remarks } = req.body;

    if (!studentId || !courseId || !status) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const attendance = new Attendance({
      student: studentId,
      course: courseId,
      status,
      remarks,
    });

    await attendance.save();

    res.status(201).json({
      message: "Attendance marked successfully.",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Error marking attendance.", error });
  }
});

export const getAllAttendances = catchAsyncHandler(async (req, res) => {
  try {
    const attendances = await Attendance.find({})
      .populate("student", "name email")
      .populate("course", "title");

    if (!attendances || attendances.length === 0) {
      return res.status(404).json({ message: "No attendances found." });
    }

    res.status(200).json({
      message: "Attendances fetched successfully.",
      data: attendances,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendances.", error });
  }
});

export const getAttendanceById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Attendance ID is required." });
    }

    const attendance = await Attendance.findById(id).populate("student course");
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found." });
    }
    return res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance.", error });
  }
});

export const updateAttendance = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const attendance = await Attendance.findByIdAndUpdate(
      id,
      { status, remarks },
      { new: true }
    );

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found." });
    }

    return res.status(200).json({ message: "Attendance updated.", attendance });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating attendance.", error });
  }
});

export const deleteAttendance = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Attendance ID is required." });
    }
    const attendance = await Attendance.findByIdAndDelete(id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found." });
    }
    return res.status(200).json({ message: "Attendance deleted." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting attendance.", error });
  }
});
