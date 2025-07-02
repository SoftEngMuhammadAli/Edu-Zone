import Like from "../../models/post-interactions/likes_model.js";

export const createLike = async (req, res) => {
  try {
    const like = new Like(req.body);
    if (!like) {
      return res.status(400).json({ message: "Invalid like data", data: null });
    }

    await like.save();
    return res.status(201).json({ message: "Like added", data: like });
  } catch (error) {
    return res.status(400).json({ message: "Failed to add like", error });
  }
};

export const getAllLikes = async (req, res) => {
  try {
    const likes = await Like.find()
      .populate("user", "name email")
      .populate("lessonId", "title")
      .populate("assignmentId", "title");

    if (!likes || likes.length === 0) {
      return res.status(404).json({ message: "No likes found", data: [] });
    }

    return res.status(200).json({ message: "Likes fetched", data: likes });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch likes", error });
  }
};

export const getLikeById = async (req, res) => {
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
    return res.status(400).json({ message: "Invalid like ID", error });
  }
};

export const updateLike = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Like.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Like not found", data: null });
    }

    return res.status(200).json({ message: "Like updated", data: updated });
  } catch (error) {
    return res.status(400).json({ message: "Failed to update like", error });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Like.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Like not found", data: null });
    }

    return res.status(200).json({ message: "Like deleted", data: deleted });
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete like", error });
  }
};
