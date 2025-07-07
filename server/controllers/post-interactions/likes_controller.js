import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Like from "../../models/post-interactions/likes_model.js";

export const createLike = catchAsyncHandler(async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { user, lessonId, assignmentId } = req.body || {};

    if (!user || (!lessonId && !assignmentId)) {
      return res.status(400).json({
        message:
          "User and either lessonId or assignmentId are required to create a like.",
      });
    }

    const existingLike = await Like.findOne({
      user,
      // Check if either lessonId or assignmentId is provided
      // If both are provided, it will check for both
      ...(lessonId && { lessonId }),
      ...(assignmentId && { assignmentId }),
    });

    if (existingLike) {
      return res.status(409).json({ message: "Like already exists." });
    }

    const newLike = new Like({
      user,
      lessonId: lessonId || undefined,
      assignmentId: assignmentId || undefined,
    });

    if (!newLike) {
      return res.status(400).json({
        message: "Failed to create like. Please check your input.",
      });
    }

    await newLike.save();

    return res.status(201).json({
      message: "Like created successfully.",
      data: newLike,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const getAllLikes = catchAsyncHandler(async (req, res) => {
  try {
    const likes = await Like.find()
      .populate("user", "name email")
      .populate("lessonId", "title")
      .populate("assignmentId", "title");

    if (!likes || likes.length === 0) {
      return res.status(404).json({ message: "No likes found." });
    }

    return res.status(200).json({
      message: "Likes fetched",
      data: likes,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const getLikeById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const like = await Like.findById(id)
      .populate("user", "name email")
      .populate("lessonId", "title")
      .populate("assignmentId", "title");

    if (!like) {
      return res.status(404).json({ message: "Like not found", data: null });
    }

    return res.status(200).json({ message: "Like fetched", data: like });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const updateLike = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { lessonId, assignmentId } = req.body;

    if (!lessonId && !assignmentId) {
      return res.status(400).json({
        message: "Either lessonId or assignmentId must be provided for update.",
      });
    }

    const updated = await Like.findByIdAndUpdate(
      id,
      { lessonId, assignmentId },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Like not found", data: null });
    }

    return res.status(200).json({ message: "Like updated", data: updated });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const deleteLike = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Like ID is required" });
    }

    const deleted = await Like.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Like not found", data: null });
    }

    return res.status(200).json({ message: "Like deleted", data: deleted });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
