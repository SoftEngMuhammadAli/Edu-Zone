import React from "react";
import {
  AskedQuestions,
  ContactUs,
  CourseRecommendations,
  CourseRegistration,
  CoursesFeedBack,
  EduZoneBenefits,
  Footer,
  HomeBanner,
  ReadHomeBlogs,
  StatisticPartners,
} from "../../components";
import AboutUs from "../../components/about/AboutUs";

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

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
