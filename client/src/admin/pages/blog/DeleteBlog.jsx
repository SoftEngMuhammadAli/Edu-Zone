import React from "react";

const DeleteBlogPage = () => {
  // Static mock data for now
  const blogs = [
    {
      _id: "1",
      title: "Understanding React Hooks",
      author: "Ali Khan",
      category: "Technology",
      publish_date: "2025-07-09",
    },
    {
      _id: "2",
      title: "Top 10 Study Tips",
      author: "Sarah Ahmed",
      category: "Education",
      publish_date: "2025-07-08",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage & Delete Blogs</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t text-sm">
                <td className="px-4 py-3">{blog.title}</td>
                <td className="px-4 py-3">{blog.author}</td>
                <td className="px-4 py-3">{blog.category}</td>
                <td className="px-4 py-3">{blog.publish_date}</td>
                <td className="px-4 py-3 text-center">
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No blogs available to delete.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteBlogPage;
