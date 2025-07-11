import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../features/admin/blogSlice";
import { AppFooter } from "../../components/footer/Footer";

const ReadAllBlogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center py-8 text-[#1C1E53]">Loading blogs...</div>
    );
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!blogs.length)
    return (
      <div className="text-center py-8 text-[#1C1E53]">No blogs found.</div>
    );

  return (
    <>
      <section className="bg-white text-black py-12 px-4 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Search + Filter */}
          <input
            type="text"
            placeholder="Cari Blog Favorit atau Berita ..."
            className="w-full border border-gray-300 rounded-full px-5 py-3"
          />
          <div className="flex flex-wrap gap-4 mt-4 font-semibold text-sm text-[#1C1E53]">
            {["Semua", "Tips & Trik", "Event", "Berita"].map((cat, i) => (
              <button
                key={i}
                className={`${
                  i === 0
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "hover:text-yellow-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="rounded shadow p-3">
                <img
                  src={blog.thumbnail || "https://via.placeholder.com/300"}
                  className="w-full h-40 object-cover rounded mb-3"
                  alt="thumb"
                />
                <p className="text-xs text-gray-400">
                  {new Date(blog.publish_date).toDateString()}
                </p>
                <h4 className="text-base font-semibold text-black mt-1">
                  {blog.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {blog.content}
                </p>
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
