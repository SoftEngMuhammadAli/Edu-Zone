import React from "react";
import { useNavigate } from "react-router-dom";
import useFetchData from "../../hooks/useCustomHooks";

const ReadHomeBlogs = () => {
  const navigate = useNavigate();
  const {
    data: blogs,
    loading,
    error,
  } = useFetchData("https://eduzone-jscm.onrender.com/api/blogs/");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] text-lg font-semibold">
        Loading Blogs...
      </div>
    );
  }

  if (error || blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] text-lg font-semibold">
        {error || "No blogs available."}
      </div>
    );
  }

  return (
    <section className="bg-white text-black py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center md:text-left">
            Blog, News and Events
          </h2>
          <a
            onClick={() => navigate("/allblogs")}
            href="#"
            className="text-[#1C1E53] font-medium text-base hover:underline inline-flex items-center"
          >
            See All <span className="ml-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog._id}
              className="rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white"
            >
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-lg text-sm font-bold">
                No Image Found
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(blog.publish_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">
                  {blog.content.slice(0, 100)}...
                </p>
                <a
                  href="#"
                  className="text-[#FFFFFF] px-3 py-2 rounded-[5px] font-medium hover:underline inline-flex items-center text-sm md:text-base bg-[#1C1E53]"
                >
                  See More <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadHomeBlogs;
