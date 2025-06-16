import React from "react";
import { Footer } from "../../components";
import { useNavigate } from "react-router-dom";

const categories = [
  "Semua",
  "UI/UX",
  "Programming",
  "Marketing",
  "Soft skill",
  "Network",
  "Data Science",
  "Business",
  "Design",
];

const dummyCourses = Array.from({ length: 20 }).map((_, index) => {
  const titles = [
    "Web Programming Design Basics",
    "Digital Marketing 101",
    "Introduction to Data Science",
    "Basic Public Speaking",
    "JavaScript Fundamentals",
    "Premium UI/UX Design",
    "Essential Internet Basics",
    "Technology Coaching",
    "Machine Learning 101",
    "Python Programming",
    "Data Analysis Techniques",
    "Full Stack Web Development",
    "Cyber Security Essentials",
    "Artificial Intelligence Basics",
    "Cloud Computing Concepts",
    "Networking Fundamentals",
    "Database Management Systems",
    "Graphic Design Basics",
    "Digital Photography",
    "Video Editing Essentials",
  ];

  return {
    id: index + 1,
    title: titles[index],
    description:
      "This course provides a complete foundation in " +
      titles[index].split(" ")[0] +
      " with hands-on projects, clear instructions, and practical applications.",
    image: `http://dummyimage.com/400x300.png/5fa2dd/ffffff&text=Course+${
      index + 1
    }`,
    category: [
      "UI/UX",
      "Programming",
      "Marketing",
      "Soft skill",
      "Network",
      "Data Science",
      "Business",
      "Design",
    ][Math.floor(Math.random() * 8)],
    views: 1200 + index * 37,
    students: 2500 + index * 45,
    rating: Math.floor(Math.random() * 5) + 1,
    duration: `${Math.floor(Math.random() * 10) + 1} hours`,
    level: ["Beginner", "Intermediate", "Advanced"][
      Math.floor(Math.random() * 3)
    ],
  };
});

const SeeAllCoursesList = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari Pelatihan ..."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 text-sm text-[#2D2F6B] font-semibold">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-3 py-1 border-b-2 ${
                i === 0 ? "border-[#2D2F6B]" : "border-transparent"
              } hover:border-[#2D2F6B] transition`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`, { state: course })}
            className="bg-white border rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
              <p className="mb-2 text-justify">{course.description}</p>
              <div className="text-xs text-gray-500 flex gap-4">
                <span>👁️ {course.views}</span>
                <span>👨‍🎓 {course.students}</span>
              </div>
            </div>

            <button className="max-h-full min-w-full p-3 rounded-b-sm bg-[#2D2F6B] text-[#FFFFFF]">
              See Details...
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-16">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`w-8 h-8 flex items-center justify-center rounded border ${
              page === 2
                ? "bg-[#2D2F6B] text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SeeAllCoursesList;
