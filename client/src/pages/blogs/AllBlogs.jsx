import axios from "axios";
import React, { useEffect, useState } from "react";
import { AppFooter } from "../../components/footer/Footer";

const ReadAllBlogs = () => {
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://eduzone-jscm.onrender.com/api/blogs/all";

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setData(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-[#1C1E53] font-semibold text-lg">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 font-semibold text-lg">
        {error}
      </div>
    );
  }

  if (!getData.length) {
    return (
      <div className="text-center py-8 text-[#1C1E53] font-semibold text-lg">
        No blogs found.
      </div>
    );
  }

  return (
    <>
      <section className="bg-white text-black py-12 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-10 gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center md:text-left">
              All Blogs & News
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getData.map((blog) => (
              <div
                key={blog._id}
                className="rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white"
              >
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-lg">
                  No Image Available
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(blog.publish_date).toDateString()}
                  </p>

                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                    {blog.title}
                  </h3>

                  <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">
                    {blog.content}
                  </p>

                  <div className="text-sm text-gray-500 mb-2">
                    <p>
                      <strong>Author:</strong> {blog.author}
                    </p>
                    <p>
                      <strong>Category:</strong> {blog.category}
                    </p>
                    <p>
                      <strong>Tags:</strong> {blog.tags?.join(", ") || "N/A"}
                    </p>
                  </div>

                  <div className="flex justify-between text-xs text-gray-400 mt-4">
                    <span>👁 {blog.views}</span>
                    <span>❤️ {blog.likes}</span>
                    <span>💬 {blog.comments}</span>
                  </div>

                  <a
                    href="#"
                    className="text-[#1C1E53] font-medium hover:underline inline-flex items-center text-sm mt-4"
                  >
                    Read More <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AppFooter />
    </>
  );
};

export default ReadAllBlogs;
