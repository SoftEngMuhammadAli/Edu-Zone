import express from "express";
import Attendance from "../../models/users/attendance_model.js";
import Course from "../../models/course/course_model.js";
import User from "../../models/users/users_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

const router = express.Router();

export const markAttendance = catchAsyncHandler(async (req, res) => {
  const { studentId, courseId, sessionDate, status, remarks } = req.body;

  if (!studentId || !courseId || !sessionDate || !status) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const course = await Course.findById(courseId);
  const student = await User.findById(studentId);
  if (!course || !student || student.user_type !== "student") {
    return res.status(400).json({ message: "Invalid student or course." });
  }

  const existing = await Attendance.findOne({
    student: studentId,
    course: courseId,
    sessionDate,
  });

  if (existing) {
    return res
      .status(409)
      .json({ message: "Attendance already marked for this session." });
  }

  const attendance = new Attendance({
    student: studentId,
    course: courseId,
    sessionDate,
    status,
    remarks,
  });

  await attendance.save();

  return res
    .status(201)
    .json({ message: "Attendance recorded successfully", attendance });
});

export const getAllAttendances = catchAsyncHandler(async (req, res) => {
  const attendances = await Attendance.find().populate("student course");
  res.status(200).json(attendances);
});

export const getAttendanceById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const attendance = await Attendance.findById(id).populate("student course");
  if (!attendance) {
    return res.status(404).json({ message: "Attendance not found." });
  }
  res.status(200).json(attendance);
});

export const updateAttendance = catchAsyncHandler(async (req, res) => {
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

  res.status(200).json({ message: "Attendance updated.", attendance });
});

export const deleteAttendance = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const attendance = await Attendance.findByIdAndDelete(id);
  if (!attendance) {
    return res.status(404).json({ message: "Attendance not found." });
  }
  res.status(200).json({ message: "Attendance deleted." });
});

export default router;
