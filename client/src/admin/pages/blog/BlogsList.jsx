import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../features/admin/blogSlice";
import { useNavigate } from "react-router-dom";

const BlogListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">All Blogs</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 border rounded-md shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-medium">{blog.title}</h2>
                <p className="text-sm text-gray-500">
                  {blog.category?.name || "No category"}
                </p>
              </div>
              <button
                onClick={() => navigate(`/admin/blog/update-blog/${blog._id}`)}
                className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
