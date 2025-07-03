import mongoose from "mongoose";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Rating from "../../models/rating/rating_model.js";

export const createRating = catchAsyncHandler(async (req, res) => {
  const { userId, courseId, rating, comment } = req.body;

  if (!userId || !courseId || rating == null || !comment) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid course ID." });
  }

  if (typeof rating !== "number" || rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ message: "Rating must be a number between 1 and 5." });
  }

  const trimmedComment = comment.trim();
  if (trimmedComment.length < 3) {
    return res
      .status(400)
      .json({ message: "Comment must be at least 3 characters." });
  }

  const existing = await Rating.findOne({ userId, courseId });
  if (existing) {
    return res
      .status(409)
      .json({ message: "Rating already exists for this course by the user." });
  }

  const newRating = new Rating({
    userId,
    courseId,
    rating,
    comment: trimmedComment,
  });

  await newRating.save();

  return res.status(201).json({
    message: "Rating created successfully",
    rating: newRating,
  });
});

export const getAllRatings = catchAsyncHandler(async (req, res) => {
  const ratings = await Rating.find().populate("userId", "name");

  if (!ratings.length) {
    return res.status(404).json({ message: "No ratings found." });
  }

  return res.status(200).json({ message: "All ratings", data: ratings });
});

export const getRatingsByCourse = catchAsyncHandler(async (req, res) => {
  const { courseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: "Invalid course ID." });
  }

  const ratings = await Rating.find({ courseId }).populate("userId", "name");

  if (!ratings.length) {
    return res
      .status(404)
      .json({ message: "No ratings found for this course." });
  }

  return res.status(200).json({ message: "Ratings fetched", data: ratings });
});

export const deleteRating = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid rating ID." });
  }

  const deletedData = await Rating.findByIdAndDelete(id);

  if (!deletedData) {
    return res.status(404).json({ message: "Rating not found." });
  }

  return res
    .status(200)
    .json({ message: "Rating deleted successfully.", data: deletedData });
});
