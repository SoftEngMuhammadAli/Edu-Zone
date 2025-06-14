import React from "react";
import bannerImage from "/src/assets/images/home-banner-frame.png";

const HomeBanner = () => {
  return (
    <section className="min-h-screen bg-[#1C1E53] text-white flex flex-col justify-evenly md:flex-row items-center md:justify-between px-6 md:px-16 py-10">
      {/* Left Content */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Build and Achieve Your Dreams <br /> with{" "}
          <span className="text-yellow-400">EDU-ZONE</span>
        </h1>

        <p className="text-base md:text-lg text-gray-200 max-w-xl">
          EDU-ZONE is a free online learning and training platform that helps
          you achieve your goals in the tech field.
        </p>

        <div className="flex flex-col md:flex-row gap-4  items-center justify-center md:justify-start">
          <button className="bg-eduzoneYellow bg-[#FCD980] text-[#000000] font-medium py-2 px-6 rounded hover:bg-yellow-300 transition">
            View Courses
          </button>
          <button className="text-eduzoneYellow hover:underline font-medium flex items-center gap-2">
            View Learning Path →
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden md:flex w-full md:w-1/2 mt-10 md:mt-0 pl-20 justify-center">
        <img
          src={bannerImage}
          alt="EDU-ZONE Banner"
          className="md:max-w-full h-auto"
        />
      </div>
    </section>
  );
};

export default HomeBanner;
