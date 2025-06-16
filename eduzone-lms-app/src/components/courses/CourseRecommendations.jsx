import React from "react";
import webProgrammingImg from "../../assets/images/courses/courses_programming.png";
import digitalMarketingImg from "../../assets/images/courses/courses_marketing.png";
import dataScienceImg from "../../assets/images/courses/courses_data_science.png";
import { useNavigate } from "react-router-dom";

const CourseRecommendations = () => {
  const courses = [
    {
      title: "Web Programming Basics",
      description: "Learning materials for beginner-level website creation",
      duration: "4.5 Hours",
      videos: "20 Videos",
      students: "1,900 Students",
      image: webProgrammingImg,
      category: "Web Development",
    },
    {
      title: "Digital Marketing 101",
      description: "Beginner-level marketing strategies and concepts",
      duration: "6.2 Hours",
      videos: "32 Videos",
      students: "930 Students",
      image: digitalMarketingImg,
      category: "Digital Marketing",
    },
    {
      title: "Data Science Fundamentals",
      description: "Learning materials for data science basics and advanced",
      duration: "8 Hours",
      videos: "46 Videos",
      students: "1,043 Students",
      image: dataScienceImg,
      category: "Data Science",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="p-6 sm:p-10 max-w-8xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="sm:text-3xl md:text-4xl font-bold">
          Recommended Courses For You
        </h2>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <select className="py-2 px-5 border rounded-md bg-white text-gray-700 w-full sm:w-auto">
            <option value="">All Categories</option>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
            <option value="data-science">Data Science</option>
            <option value="language">Languages</option>
            <option value="photography">Photography</option>
          </select>

          <button
            onClick={() => navigate("/SeeAllCourses")}
            className="bg-[#FCD980] hover:bg-[#F4C44F] text-gray-800 font-medium py-2 px-6 rounded-md transition-colors whitespace-nowrap"
          >
            See All Courses
          </button>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Course Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Course Content */}
            <div className="p-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-[#2405F2] bg-[#2405F2]/10 rounded-full mb-2">
                {course.category}
              </span>
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {course.duration}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {course.videos}
                </span>
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {course.students}
                </span>
              </div>

              <button className="w-full bg-[#2405F2] hover:bg-[#1a04c4] text-white py-2 rounded-md transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseRecommendations;
