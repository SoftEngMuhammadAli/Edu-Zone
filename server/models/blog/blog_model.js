import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publish_date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    tags: {
      type: [String],
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["tech", "lifestyle", "travel", "custom"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema, "blogs");
