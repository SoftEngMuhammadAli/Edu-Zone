import React from "react";
import aboutUsImage from "../../assets/images/main/about-us-image.png";
import ContactUs from "../contact/ContactUs";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";

const AboutUs = () => {
  const location = useLocation();

  return (
    <section className="relative bg-white min-h-screen">
      <div className="md:hidden absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src={aboutUsImage}
          alt="Students learning online with EduZone"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 grid grid-cols-1 text-center md:text-left md:grid-cols-2 min-h-screen items-center">
        {/* Left Text Section*/}
        <div className="flex flex-col place-items-center md:place-items-start gap-6 p-8 md:p-12 lg:p-16">
          <span className="text-[#232536] font-medium text-lg">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#000000] leading-tight">
            EDU-ZONE Free E-Learning Service to Help You Grow
          </h1>
          <p className="text-[#282938] text-lg md:text-xl leading-relaxed">
            EduZone is expected to be a useful service for the future in the
            field of education, providing accessible learning resources for
            everyone.
          </p>
          <button className="bg-[#2405F2] text-white py-3 px-6 rounded-md w-fit hover:bg-[#1a04c4] transition-colors mt-4">
            Learn More
          </button>
        </div>

        {/* Right Image Section */}
        <div className="hidden md:block h-full w-full">
          <img
            className="w-full h-full object-cover"
            src={aboutUsImage}
            alt="Students learning online with EduZone"
          />
        </div>
      </div>

      {location.pathname !== "/" && location.pathname !== "/home" && (
        <>
          <ContactUs />
          <Footer />
        </>
      )}
    </section>
  );
};

export default AboutUs;
