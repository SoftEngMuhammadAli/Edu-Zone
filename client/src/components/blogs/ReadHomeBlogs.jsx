import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../features/admin/blogSlice";

const ReadHomeBlogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] font-semibold">
        Loading Blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] font-semibold">
        No blogs available.
      </div>
    );
  }

  return (
    <section className="bg-white text-black py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Blog, News and Events
          </h2>
          <button
            onClick={() => navigate("/allblogs")}
            className="text-[#1C1E53] hover:underline"
          >
            See All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((item) => (
            <div key={item._id} className="rounded-lg shadow bg-white">
              <div className="w-full h-56 bg-gray-200 flex justify-center items-center text-sm font-bold text-gray-500">
                No Image
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(item.publish_date).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {item.content?.slice(0, 100)}...
                </p>
                <button
                  onClick={() => navigate(`/blog/${item._id}`)}
                  className="bg-[#1C1E53] text-white px-4 py-2 mt-3 rounded text-sm"
                >
                  See More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadHomeBlogs;
