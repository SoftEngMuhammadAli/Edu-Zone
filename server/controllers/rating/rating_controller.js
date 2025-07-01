import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Rating from "../../models/rating/rating_model.js";

export const createRating = catchAsyncHandler(async (req, res) => {
  try {
    const { userId, courseId, rating, comment } = req.body;

    if (!userId || !courseId || !rating || !comment) {
      return res.status(400).json({ message: "Invalid input fields" });
    }

    const newRating = new Rating({ userId, courseId, rating, comment });
    await newRating.save();

    return res.status(201).json({
      message: "Rating created successfully",
      rating: newRating,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export const getAllRatings = catchAsyncHandler(async (req, res) => {
  try {
    const ratings = await Rating.find({}).populate("userId", "name");

    if (ratings.length === 0) {
      return res.status(404).json({ message: "No ratings found" });
    }

    return res.status(200).json({ message: "All ratings", data: ratings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

export const getRatingsByCourse = catchAsyncHandler(async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    const ratings = await Rating.find({ courseId }).populate("userId", "name");

    if (!ratings || ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this course" });
    }

    return res.status(200).json({ message: "Ratings fetched", data: ratings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

export const deleteRating = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Rating ID is required" });
    }

    const deletedData = await Rating.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: "Rating not found" });
    }

    return res
      .status(200)
      .json({ message: "Rating deleted", data: deletedData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});
