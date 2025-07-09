import React from "react";
import { AppFooter } from "../../components/footer/Footer";
import useFetchData from "../../hooks/useCustomHooks";

const ReadAllBlogs = () => {
  const {
    data: getData,
    loading,
    error,
  } = useFetchData("https://eduzone-jscm.onrender.com/api/blogs/");

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
      <section className="bg-white text-black py-12 px-4 sm:px-6 md:px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar and Categories */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari Blog Favorit atau Berita ..."
              className="w-full border border-gray-300 rounded-full px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-[#1C1E53] font-semibold">
              {[
                "Semua",
                "Tips & Trik",
                "Event",
                "Berita",
                "Soft Skill",
                "Hard Skill",
                "Tutorial",
              ].map((cat, idx) => (
                <button
                  key={idx}
                  className={`${
                    idx === 0
                      ? "text-yellow-500 border-b-2 border-yellow-500"
                      : "hover:text-yellow-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout for Blogs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Blog */}
            {getData[0] && (
              <div className="md:col-span-2 flex flex-col md:flex-row gap-4 bg-white">
                <img
                  src={
                    getData[0].thumbnail || "https://via.placeholder.com/300"
                  }
                  alt="Blog"
                  className="w-full md:w-1/2 rounded object-cover"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(getData[0].publish_date).toDateString()}
                    </p>
                    <h2 className="text-xl font-bold text-black mb-2">
                      {getData[0].title}
                    </h2>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {getData[0].content}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mt-4 flex gap-4">
                    <span>👁 {getData[0].views}</span>
                    <span>❤️ {getData[0].likes}</span>
                    <span>💬 {getData[0].comments}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Vertical Blog List */}
            <div className="space-y-6">
              {getData.slice(1, 4).map((blog) => (
                <div key={blog._id} className="flex gap-3 items-start">
                  <img
                    src={blog.thumbnail || "https://via.placeholder.com/80"}
                    alt="Thumb"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-gray-400">
                      {new Date(blog.publish_date).toDateString()}
                    </p>
                    <h4 className="font-semibold text-sm text-black leading-tight line-clamp-2">
                      {blog.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Grid Thumbnails */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {getData.slice(4).map((blog) => (
                <div
                  key={blog._id}
                  className="rounded shadow hover:shadow-lg p-3 bg-white"
                >
                  <img
                    src={blog.thumbnail || "https://via.placeholder.com/300"}
                    alt="Thumb"
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <p className="text-xs text-gray-400">
                    {new Date(blog.publish_date).toDateString()}
                  </p>
                  <h4 className="text-base font-semibold text-black mt-1 line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {blog.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="col-span-full mt-8 flex justify-center">
              <div className="flex gap-2 text-sm">
                <button className="w-8 h-8 rounded bg-yellow-400 text-white">
                  1
                </button>
                <button className="w-8 h-8 rounded border">2</button>
                <button className="w-8 h-8 rounded border">3</button>
                <button className="w-8 h-8 rounded border">...</button>
                <button className="w-8 h-8 rounded border">8</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppFooter />
    </>
  );
};

export default ReadAllBlogs;
