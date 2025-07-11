import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogThunk } from "../../../features/admin/blogSlice";
import axiosInstance from "../../../services/axios";

const CreateBlogPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.blogs || {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/api/blogs/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Handle blog creation
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const blogData = new FormData();

    const title = form.get("title");
    const content = form.get("content");
    const category = form.get("category");
    const tagsArray =
      form
        .get("tags")
        ?.split(",")
        .map((tag) => tag.trim()) || [];
    const imageFiles = form.getAll("images");

    blogData.append("title", title);
    blogData.append("content", content);
    blogData.append("category", category);
    blogData.append("tags", JSON.stringify(tagsArray));
    imageFiles.forEach((file) => {
      blogData.append("images", file);
    });

    dispatch(createBlogThunk(blogData))
      .unwrap()
      .then(() => {
        console.log("✅ Blog created!");
        e.target.reset();
      })
      .catch((err) => {
        console.error("❌ Blog creation failed:", err);
      });
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
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
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

        {error && (
          <div className="text-red-600 text-sm pt-2">❌ Error: {error}</div>
        )}
      </form>
    </div>
  );
};

export default CreateBlogPage;
