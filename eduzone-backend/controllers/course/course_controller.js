const Course = require("../../models/course/course_model");
const mongoose = require("mongoose");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    if (!courses) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Courses are fetched successfully!", data: courses });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch courses", details: error.message });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid Course ID" });

  try {
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    return res.status(200).json(course);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch course", details: error.message });
  }
};

const createCourse = async (req, res) => {
  const {
    title,
    description,
    image,
    category,
    views,
    students,
    rating,
    duration,
    level,
  } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      image,
      category,
      views,
      students,
      rating,
      duration,
      level,
    });

    await newCourse.save();
    return res
      .status(201)
      .json({ message: "Course created", course: newCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to create course", details: error.message });
  }
};

const updateCourseById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid Course ID" });

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCourse)
      return res.status(404).json({ error: "Course not found" });

    return res
      .status(200)
      .json({ message: "Course updated", course: updatedCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update course", details: error.message });
  }
};

// DELETE course by ID
const deleteCourseById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid Course ID" });

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse)
      return res.status(404).json({ error: "Course not found" });

    return res
      .status(200)
      .json({ message: "Course deleted", course: deletedCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to delete course", details: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
};
