import React from "react";
import {
  AboutUs,
  EduZoneBenefits,
  HeaderNav,
  HomeBanner,
  StatisticPartners,
} from "../components";

const Home = () => {
  return (
    <React.Fragment>
      {/* Header */}
      <HeaderNav />

      {/* Home Banner */}
      <HomeBanner />

      {/* Statisctics Partners */}
      <StatisticPartners />

      {/* Benefits of Joining EDUFREE E-Learning */}
      <EduZoneBenefits />

      {/* About Us */}
      <AboutUs />
    </React.Fragment>
  );
};

export default Home;
