import React from "react";
import {
  AboutUs,
  AskedQuestions,
  ContactUs,
  CourseRecommendations,
  CourseRegistration,
  CoursesFeedBack,
  EduZoneBenefits,
  Footer,
  HomeBanner,
  ReadAllBlogs,
  StatisticPartners,
} from "../../components";

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
      <ReadAllBlogs />

      {/* Contact Us */}
      <ContactUs />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
