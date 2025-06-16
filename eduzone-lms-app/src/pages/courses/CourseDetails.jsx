import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../../components";

const CourseDetail = () => {
  const { state } = useLocation();
  const course = state;
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-50  min-h-screen py-10 px-6  sm:px-10">
        <div className="w-full border border-gray-400  shadow-sm rounded-lg mx-auto p-6">
          <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-500 mb-6">
            Level: {course.level} | Duration: {course.duration}
          </p>

          <div className="mb-6">
            <img
              src={course.image}
              alt={course.title}
              className="w-full rounded-lg"
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About the Course</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Target Audience</h2>
            <p className="text-gray-700">
              This course is designed for beginners and intermediate learners
              who want to master {course.title.split(" ")[0]} concepts.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Basic understanding of computers</li>
              <li>Stable internet connection</li>
              <li>Recommended: Google Chrome & VS Code</li>
            </ul>
          </div>

          <div className="text-center mt-10">
            <p className="text-lg font-bold">Don’t Miss This Opportunity!</p>
            <p className="text-sm text-gray-500 mb-4">
              Start your learning journey today.
            </p>
            <button
              onClick={() => {
                navigate("/coursesuccess");
              }}
              className="px-6 py-2 bg-[#1C1E53] text-white rounded-md hover:bg-yellow-500 transition"
            >
              Join Course
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;
