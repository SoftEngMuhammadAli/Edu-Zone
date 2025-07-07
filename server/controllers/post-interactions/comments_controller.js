import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Comment from "../../models/post-interactions/comments_model.js";

export const createComment = catchAsyncHandler(async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { user, commentOnPost, lessonId, assignmentId } = req.body;

    if (!user || !commentOnPost?.trim() || (!lessonId && !assignmentId)) {
      return res.status(400).json({
        message:
          "User, commentOnPost text, and either lessonId or assignmentId are required.",
      });
    }

    const newComment = new Comment({
      user,
      commentOnPost: commentOnPost.trim(),
      lessonId,
      assignmentId,
    });

    if (!newComment) {
      return res.status(400).json({
        message: "Failed to create comment. Please check your input.",
      });
    }

    await newComment.save();

    return res.status(201).json({
      message: "Comment created",
      data: newComment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const getAllComments = catchAsyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name email")
      .populate("lessonId", "title")
      .populate("assignmentId", "title");

    if (!comments || comments.length === 0) {
      return res.status(404).json({
        message: "No comments found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "Comments fetched",
      data: comments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const getCommentById = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Comment ID is required",
      });
    }

    const comment = await Comment.findById(id)
      .populate("user", "name email")
      .populate("lessonId", "title")
      .populate("assignmentId", "title");

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Comment fetched",
      data: comment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const updateComment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Comment ID is required",
      });
    }

    const { commentOnPost } = req.body;

    if (!commentOnPost) {
      return res.status(400).json({
        message: "commentOnPost is required",
      });
    }

    if (commentOnPost && !commentOnPost.trim()) {
      return res.status(400).json({
        message: "commentOnPost cannot be empty",
      });
    }

    const updated = await Comment.findByIdAndUpdate(
      id,
      {
        ...req.body,
        ...(commentOnPost && { commentOnPost: commentOnPost.trim() }),
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Comment not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Comment updated",
      data: updated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

export const deleteComment = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Comment ID is required",
      });
    }

    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Comment not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Comment deleted",
      data: deleted,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});
