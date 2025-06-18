import React, { useEffect, useState } from "react";
import axios from "axios";
import aboutUsImage from "../../assets/images/main/about-us-image.png";
import ContactUs from "../contact/ContactUs";
import Footer from "../footer/Footer";
import { useLocation } from "react-router-dom";

const AboutUs = () => {
  const location = useLocation();
  const [aboutData, setAboutData] = useState({
    heading: "",
    subheading: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://eduzone-jscm.onrender.com/api/about"
        );
        setAboutData(response.data);
      } catch (error) {
        console.error("Failed to fetch About Us data:", error);
        setError("Failed to load About Us content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section className="relative bg-white min-h-screen">
      <div className="md:hidden absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src={aboutUsImage}
          alt="Students learning online with EduZone"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 text-center md:text-left items-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-10">
        {loading ? (
          <div className="col-span-2 text-center text-lg text-gray-600">
            Loading...
          </div>
        ) : error ? (
          <div className="col-span-2 text-center text-red-500">{error}</div>
        ) : (
          <>
            <div className="flex flex-col gap-6 items-center md:items-start">
              <span className="text-[#232536] font-medium text-lg">
                {aboutData.heading}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
                {aboutData.subheading}
              </h1>
              <p className="text-[#282938] text-base md:text-lg leading-relaxed">
                {aboutData.description}
              </p>
              <button className="bg-[#2405F2] text-white py-3 px-6 rounded-md w-fit hover:bg-[#1a04c4] transition-colors mt-2 md:mt-4">
                Learn More
              </button>
            </div>

            <div className="hidden md:block h-full w-full">
              <img
                className="w-full h-full object-cover"
                src={aboutUsImage}
                alt="Students learning online with EduZone"
              />
            </div>
          </>
        )}
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
