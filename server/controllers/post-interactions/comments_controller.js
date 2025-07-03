import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Comment from "../../models/post-interactions/comments_model.js";

export const createComment = catchAsyncHandler(async (req, res) => {
  try {
    const { user, comment, lessonId, assignmentId } = req.body;

    if (!user || !comment || (!lessonId && !assignmentId)) {
      return res.status(400).json({
        message:
          "User, comment text, and either lessonId or assignmentId are required.",
      });
    }

    const newComment = new Comment({
      user,
      comment: comment.trim(),
      lessonId,
      assignmentId,
    });

    await newComment.save();

    return res
      .status(201)
      .json({ message: "Comment created", data: newComment });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create comment", error });
  }
});

export const getAllComments = catchAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name email")
      .populate("lessonId", "title")
      .populate("assignmentId", "title");

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments found", data: [] });
    }

    return res
      .status(200)
      .json({ message: "Comments fetched", data: comments });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch comments", error });
  }
});

export const getCommentById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id)
      .populate("user", "name email")
      .populate("lessonId", "title")
      .populate("assignmentId", "title");

    if (!comment) {
      return res.status(404).json({ message: "Comment not found", data: null });
    }

    return res.status(200).json({ message: "Comment fetched", data: comment });
  } catch (error) {
    return res.status(400).json({ message: "Invalid comment ID", error });
  }
});

export const updateComment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Comment not found", data: null });
    }

    return res.status(200).json({ message: "Comment updated", data: updated });
  } catch (error) {
    return res.status(400).json({ message: "Failed to update comment", error });
  }
});

export const deleteComment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found", data: null });
    }

    return res.status(200).json({ message: "Comment deleted", data: deleted });
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete comment", error });
  }
});
