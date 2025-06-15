import React from "react";
import logoLorem from "/src/assets/icons/lorem.png";
import logoDitlance from "/src/assets/icons/ditlance.png";
import logoOwthest from "/src/assets/icons/owthest.png";
import logoNeovasi from "/src/assets/icons/neovasi.png";
import logoOnago from "/src/assets/icons/onago.png";

const StatisticPartners = () => {
  return (
    <section className="bg-[#EEF4FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-xl text-gray-500 w-full text-center mb-4">
          Our Records
        </p>
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 text-center mb-10">
          <div className="p-4 justify-center place-items-center ">
            <p className="text-4xl font-bold text-indigo-600">21,000+</p>
            <p className="mt-2 text-sm text-gray-500">Registered Students</p>
          </div>
          <div className="p-4 justify-center place-items-center">
            <p className="text-4xl font-bold text-indigo-600">100+</p>
            <p className="mt-2 text-sm text-gray-500">Instructors</p>
          </div>
          <div className="p-4 justify-center place-items-center">
            <p className="text-4xl font-bold text-indigo-600">150+</p>
            <p className="mt-2 text-sm text-gray-500">Free Courses</p>
          </div>
        </div>

        {/* Partners */}
        <div className="flex flex-wrap justify-center place-items-center gap-4">
          <p className="text-xl text-gray-500 w-full text-center mb-4">
            Our Trusted Partners
          </p>

          <div className="flex flex-row gap-4 flex-wrap justify-center">
            <div className="p-3 rounded flex items-center gap-2">
              <img src={logoLorem} alt="LOREM Logo" className="h-6 w-auto" />
            </div>

            <div className="p-3 rounded flex items-center gap-2">
              <img
                src={logoDitlance}
                alt="DITLANCE Logo"
                className="h-6 w-auto"
              />
            </div>

            <div className="p-3 rounded flex items-center gap-2">
              <img
                src={logoOwthest}
                alt="OWTHEST Logo"
                className="h-6 w-auto"
              />
            </div>

            <div className="p-3 rounded flex items-center gap-2">
              <img
                src={logoNeovasi}
                alt="NEOVASI Logo"
                className="h-6 w-auto"
              />
            </div>

            <div className="p-3 rounded flex items-center gap-2">
              <img src={logoOnago} alt="ONAGO Logo" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticPartners;
