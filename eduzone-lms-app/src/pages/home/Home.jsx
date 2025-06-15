import React from "react";
import {
  AboutUs,
  AskedQuestions,
  CourseRecommendations,
  CourseRegistration,
  CoursesFeedBack,
  EduZoneBenefits,
  Footer,
  HeaderNav,
  HomeBanner,
  ReadAllBlogs,
  StatisticPartners,
} from "../../components";

const Home = () => {
  return (
    <React.Fragment>
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

      {/* Footer */}
      <Footer />
    </React.Fragment>
  );
};

export default Home;
