import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogThunk } from "../../../features/admin/blogSlice";

const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.blog);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const blogData = new FormData();

    blogData.append("title", form.get("title"));
    blogData.append("content", form.get("content"));

    const tagsArray = form
      .get("tags")
      ?.split(",")
      .map((tag) => tag.trim());
    blogData.append("tags", JSON.stringify(tagsArray || []));

    blogData.append("category", form.get("category"));

    const imageFiles = form.getAll("images");
    imageFiles.forEach((file) => {
      blogData.append("images", file);
    });

    console.log("NEW BLOG:", {
      title,
      content,
      category,
      tags,
      author: req.user.userId,
      images: imageFiles,
    });

    dispatch(createBlogThunk(blogData));
    e.target.reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Create New Blog</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Enter blog title"
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            rows="6"
            required
            placeholder="Write your blog content here..."
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            placeholder="e.g. react, nodejs"
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select category</option>
            <option value="tech">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="mt-1 block w-full"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm pt-2">Error: {error}</p>}
      </form>
    </div>
  );
};

export default CreateBlogPage;
