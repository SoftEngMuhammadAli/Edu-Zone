import React, { useEffect, useState } from "react";
import { Footer } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SeeAllCoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://eduzone-jscm.onrender.com/api/courses/all"
        );
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#1C1E53] text-lg font-semibold">
        Loading courses...
      </div>
    );
  }
  return (
    <>
      <section className="px-4 sm:px-8 md:px-16 py-10 max-w-screen-2xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
            All Courses For You
          </h2>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {courses.slice(0, 50).map((course) => (
            <div
              key={course._id}
              onClick={() =>
                navigate(`/course/${course.title}`, { state: course })
              }
              className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Course Image */}
              <div className="h-48 sm:h-56 md:h-64 overflow-hidden flex items-center justify-center bg-gray-100">
                <span className="text-gray-500">No Image Found</span>
              </div>

              {/* Course Content */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-[#2405F2] bg-[#2405F2]/10 rounded-full mb-2">
                  {course.category}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">⏱ {course.duration}</span>
                  <span className="flex items-center">
                    🎬 {course.videos || "N/A"} Videos
                  </span>
                  <span className="flex items-center">
                    👨‍🎓 {course.students} Students
                  </span>
                </div>

                <div className="mt-auto">
                  <button className="w-full bg-[#2405F2] hover:bg-[#1a04c4] text-white py-2 rounded-md transition-colors">
                    See More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SeeAllCoursesList;
