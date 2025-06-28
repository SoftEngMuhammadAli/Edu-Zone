import React from "react";
import HomeBanner from "../../components/home/HomeBanner";
import StatisticPartners from "../../components/home/StatisticPartners";
import EduZoneBenefits from "../../components/home/EduZoneBenefits";
import AboutUs from "../../components/about/AboutUs";
import CourseRecommendations from "../../components/courses/CourseRecommendations";
import CoursesFeedBack from "../../components/courses/CoursesFeedBack";
import AskedQuestions from "../../components/frequently-asked-questions/AskedQuestions";
import CourseRegistration from "../../components/courses/CourseRegistration";
import ReadHomeBlogs from "../../components/blogs/ReadHomeBlogs";
import ContactUs from "../../components/contact/ContactUs";
import { AppFooter } from "../../components/footer/Footer";
import TermsAndConditions from "../../components/terms-and-conditions/TermsAndConditions";

const Home = () => {
  return (
    <>
      {/* Home Banner */}
      <HomeBanner />

      {/* Statisctics Partners */}
      <StatisticPartners />

      {/* Benefits of Joining EDUZONE E-Learning */}
      <EduZoneBenefits />

      {/* About Us */}
      <AboutUs />

      {/* Recommended Courses For You */}
      <CourseRecommendations />

      {/* What they say about our courses */}
      <CoursesFeedBack />

      {/* Frequently asked questions */}
      <AskedQuestions />

      {/* Register YourSelf */}
      <CourseRegistration />

      {/* Blogs */}
      <ReadHomeBlogs />

      {/* Contact Us */}
      <ContactUs />

      {/* Terms and Conditions */}
      <TermsAndConditions />

      {/* Footer */}
      <AppFooter />
    </>
  );
};

export default Home;
