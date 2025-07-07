import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Like from "../../models/post-interactions/likes_model.js";

export const createLike = catchAsyncHandler(async (req, res) => {
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

  await newLike.save();

  return res.status(201).json({
    message: "Like created successfully.",
    data: newLike,
  });
});

export const getAllLikes = catchAsyncHandler(async (req, res) => {
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
});

export const getLikeById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const like = await Like.findById(id)
    .populate("user", "name email")
    .populate("lessonId", "title")
    .populate("assignmentId", "title");

  if (!like) {
    return res.status(404).json({ message: "Like not found", data: null });
  }

  return res.status(200).json({ message: "Like fetched", data: like });
});

export const updateLike = catchAsyncHandler(async (req, res) => {
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
});

export const deleteLike = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Like.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Like not found", data: null });
  }

  return res.status(200).json({ message: "Like deleted", data: deleted });
});
