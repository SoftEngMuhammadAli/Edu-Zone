import React from "react";
import bannerImage from "/src/assets/images/main/home-banner-frame.png";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#1C1E53] text-white flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-10 gap-10">
      {/* Left Content */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Build and Achieve Your Dreams <br />
          with <span className="text-yellow-400">EDU-ZONE</span>
        </h1>

        <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto md:mx-0">
          EDU-ZONE is a free online learning and training platform that helps
          you achieve your goals in the tech field.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button
            onClick={() => navigate("/SeeAllCourses")}
            className="bg-[#FCD980] text-[#000000] font-medium py-2 px-6 rounded hover:bg-yellow-300 transition"
          >
            View Courses
          </button>

          <button className="text-[#FCD980] hover:underline font-medium flex items-center gap-2">
            View Learning Path →
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={bannerImage}
          alt="EDU-ZONE Banner"
          className="w-full max-w-md md:max-w-lg h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default HomeBanner;
