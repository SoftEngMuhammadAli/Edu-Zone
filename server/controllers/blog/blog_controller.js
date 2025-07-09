import mongoose from "mongoose";
import Blog from "../../models/blog/blog_model.js";
import { catchAsyncHandler } from "../../middlewares/error_middleware.js";
import Notification from "../../models/notifications/notification_model.js";

export const handleGetAllBlogs = catchAsyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .populate("author", "name email")
      .populate("category", "name");
    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch blogs",
      details: err.message,
    });
  }
});

export const handleGetBlogById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Blog ID" });
  }

  try {
    const blog = await Blog.findById(id)
      .populate("author", "name email")
      .populate("category", "name");
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog fetched", data: blog });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch blog",
      details: err.message,
    });
  }
});

export const handleCreateBlog = catchAsyncHandler(async (req, res) => {
  const { title, content, author, category, tags } = req.body;

  if (!title || !content || !author || !category || !tags) {
    return res.status(400).json({
      error: "Title, content, author, category, and tags are required",
    });
  }

  try {
    const imageFiles = req.files?.map((file) => file.filename) || [];

    const newBlog = new Blog({
      title,
      content,
      author,
      category,
      tags: Array.isArray(tags) ? tags : [tags],
      images: imageFiles,
    });

    await newBlog.save();

    await Notification.create({
      userId: req.user?.userId,
      message: `New blog "${newBlog.title}" has been published.`,
      type: "custom",
      link: `/blogs/${newBlog._id}`,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to create blog",
      details: err.message,
    });
  }
});

export const handleUpdateBlogById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Blog ID" });
  }

  try {
    const imageFiles = req.files?.map((file) => file.filename) || [];
    const updateData = {
      ...req.body,
    };

    if (imageFiles.length > 0) {
      updateData.images = imageFiles;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await Notification.create({
      userId: req.user?.userId,
      message: `Blog "${updatedBlog.title}" has been updated.`,
      type: "custom",
      link: `/blogs/${updatedBlog._id}`,
    });

    return res.status(200).json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to update blog",
      details: err.message,
    });
  }
});

export const handleDeleteBlogById = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Blog ID" });
  }

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    await Notification.create({
      userId: req.user?.userId,
      message: `Blog "${deletedBlog.title}" has been deleted.`,
      type: "custom",
      link: `/blogs`,
    });

    return res.status(200).json({
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to delete blog",
      details: err.message,
    });
  }
});
