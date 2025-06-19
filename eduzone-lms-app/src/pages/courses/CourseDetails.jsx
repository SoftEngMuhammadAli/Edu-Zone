import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../../components";

const CourseDetail = () => {
  const { state } = useLocation();
  const course = state;
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-50 min-h-screen px-4 sm:px-8 md:px-16 py-10">
        <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 shadow-md rounded-lg p-6 sm:p-10">
          {/* Title and Meta */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">
            {course.title}
          </h1>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Level: {course.level || "Beginner"} | Duration: {course.duration}
          </p>

          {/* Course Image */}
          <div className="h-48 sm:h-60 md:h-96 mb-5 rounded-[10px] overflow-hidden flex items-center justify-center bg-gray-100">
            <span className="text-gray-500">No Image Found</span>
          </div>

          {/* About the Course */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About the Course</h2>
            <p className="text-gray-700 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Target Audience */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Target Audience</h2>
            <p className="text-gray-700 leading-relaxed">
              This course is designed for beginners and intermediate learners
              who want to master{" "}
              <span className="font-medium">{course.title.split(" ")[0]}</span>{" "}
              concepts effectively and apply them in real-world projects.
            </p>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Basic understanding of computers</li>
              <li>Stable internet connection</li>
              <li>Recommended: Google Chrome & VS Code</li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-10">
            <p className="text-lg font-bold text-[#1C1E53]">
              Don’t Miss This Opportunity!
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Start your learning journey today.
            </p>
            <button
              onClick={() => navigate("/coursesuccess")}
              className="inline-block px-8 py-3 bg-[#1C1E53] text-white rounded-md hover:bg-[#FCD980] hover:text-[#1C1E53] transition duration-300"
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
