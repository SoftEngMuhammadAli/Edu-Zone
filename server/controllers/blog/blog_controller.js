import mongoose from "mongoose";
import Blog from "../../models/blog/blog_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";

// catchAsyncHandler
export const handleGetAllBlogs = catchAsyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({});
    if (!blogs) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).json({
      message: "Data is Fetched Successfully!",
      data: blogs,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch blogs", details: err.message });
  }
});

export const handleGetBlogById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid Blog ID" });

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    return res.status(200).json({ message: "Blog is Fetched", data: blog });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch blog", details: err.message });
  }
});

export const handleCreateBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    return res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to create blog", details: err.message });
  }
};

export const handleUpdateBlogById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid Blog ID" });

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    return res.status(200).json({ message: "Blog updated", blog: updatedBlog });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to update blog", details: err.message });
  }
};

export const handleDeleteBlogById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid Blog ID" });

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    return res.status(200).json({ message: "Blog deleted", blog: deletedBlog });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to delete blog", details: err.message });
  }
};

export default {
  handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById,
};
