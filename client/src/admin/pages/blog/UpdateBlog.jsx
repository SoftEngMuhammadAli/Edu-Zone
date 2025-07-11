import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, updateBlog } from "../../../features/admin/blogSlice";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blogs || {});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const blog = blogs.find((b) => b._id === id);
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setTags((blog.tags || []).join(", "));
      setCategory(blog.category);
    }
  }, [blogs, id]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append(
      "tags",
      JSON.stringify(tags.split(",").map((tag) => tag.trim()))
    );
    images.forEach((file) => {
      formData.append("images", file);
    });

    dispatch(updateBlog({ id, blogData: formData })).then((res) => {
      if (!res.error) navigate("/admin/dashboard-page");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Update Blog</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category ID
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md"
            />
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
              onChange={handleImageChange}
              className="mt-1 block w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>

          {error && (
            <div className="text-red-600 text-sm pt-2">❌ Error: {error}</div>
          )}
        </form>
      )}
    </div>
  );
};

export default UpdateBlogPage;
