import Comment from "../../models/post-interactions/comments_model.js";

export const createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    if (!comment) {
      return res
        .status(400)
        .json({ message: "Invalid comment data", data: null });
    }

    await comment.save();
    return res.status(201).json({ message: "Comment created", data: comment });
  } catch (error) {
    return res.status(400).json({ message: "Failed to create comment", error });
  }
};

export const getAllComments = async (req, res) => {
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
};

export const getCommentById = async (req, res) => {
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
};

export const updateComment = async (req, res) => {
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
};

export const deleteComment = async (req, res) => {
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
};
