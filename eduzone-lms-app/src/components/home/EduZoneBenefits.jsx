import React from "react";

const EduZoneBenefits = () => {
  return (
    <section className="bg-white text-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10">
        Benefits of Joining EDUZONE E-Learning
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {[...Array(6)].map((_, idx) => {
          const items = [
            "Learn Anytime, Anywhere",
            "Expert-Led Courses",
            "Cost-Effective Education",
            "Personalized Learning Paths",
            "Interactive Learning Tools",
            "Recognized Certifications",
          ];
          const desc = [
            "Access courses 24/7 from any device with internet connection. Perfect for busy professionals and students who need flexible learning schedules.",
            "Learn from industry professionals and academic experts who bring real-world experience to your virtual classroom.",
            "Save on commuting, accommodation, and material costs while receiving high-quality education at a fraction of traditional costs.",
            "Customize your learning experience with courses tailored to your skill level, interests, and career goals.",
            "Engage with quizzes, discussion forums, and hands-on projects that enhance retention and practical application of knowledge.",
            "Earn valuable certificates upon completion that can boost your resume and professional credentials.",
          ];
          return (
            <div
              key={idx}
              className="rounded-[10px] bg-[#F4F6FC] p-6 sm:p-8 md:p-10"
            >
              <div className="flex justify-center items-center bg-[#2405F2] text-white rounded-md h-8 w-8 mb-4">
                {idx + 1}
              </div>
              <h3 className="font-semibold text-lg mb-2">{items[idx]}</h3>
              <p className="text-gray-600 text-sm md:text-base">{desc[idx]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EduZoneBenefits;
