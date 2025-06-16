import React from "react";
import blogImage1 from "../../assets/images/blogs/blog-image-1.png";
import blogImage2 from "../../assets/images/blogs/blog-image-2.png";
import blogImage3 from "../../assets/images/blogs/blog-image-3.png";

const blogs = [
  {
    id: 1,
    image: blogImage1,
    date: "19 Jan 2022",
    title: "Easy Ways to Start Learning Programming - EDUZONE",
    description:
      "Becoming a programmer is now very easy to learn for anyone ...",
  },
  {
    id: 2,
    image: blogImage2,
    date: "19 Jan 2022",
    title: "Tips for Creating a Business Landing Page Website - EDUZONE",
    description:
      "The importance of a website in growing a sense of trust in a business, making ...",
  },
  {
    id: 3,
    image: blogImage3,
    date: "19 Jan 2022",
    title: "How to Install Wordpress for Beginners - EDUZONE",
    description:
      "Nowadays, you can create a website without coding, now you can create it with ...",
  },
];

const ReadAllBlogs = () => {
  return (
    <section className="bg-white text-black py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center md:text-left">
            Blog, News and Events
          </h2>
          <a
            href="#"
            className="text-[#1C1E53] font-medium text-base hover:underline inline-flex items-center"
          >
            See All <span className="ml-1">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover rounded-t-lg"
              />
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {blog.description}
                </p>
                <a
                  href="#"
                  className="text-[#1C1E53] font-medium hover:underline inline-flex items-center text-sm md:text-base"
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

export default ReadAllBlogs;
