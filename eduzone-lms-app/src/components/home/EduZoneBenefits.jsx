import React from "react";

const EduZoneBenefits = () => {
  return (
    <div>
      <section className="bg-white text-center md:max-w-9xl px-4 py-10 sm:px-6 md:px-8 lg:px-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Benefits of Joining EDUZONE E-Learning
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {[
            {
              number: 1,
              title: "Learn Anytime, Anywhere",
              desc: "Access courses 24/7 from any device with internet connection. Perfect for busy professionals and students who need flexible learning schedules.",
            },
            {
              number: 2,
              title: "Expert-Led Courses",
              desc: "Learn from industry professionals and academic experts who bring real-world experience to your virtual classroom.",
            },
            {
              number: 3,
              title: "Cost-Effective Education",
              desc: "Save on commuting, accommodation, and material costs while receiving high-quality education at a fraction of traditional costs.",
            },
            {
              number: 4,
              title: "Personalized Learning Paths",
              desc: "Customize your learning experience with courses tailored to your skill level, interests, and career goals.",
            },
            {
              number: 5,
              title: "Interactive Learning Tools",
              desc: "Engage with quizzes, discussion forums, and hands-on projects that enhance retention and practical application of knowledge.",
            },
            {
              number: 6,
              title: "Recognized Certifications",
              desc: "Earn valuable certificates upon completion that can boost your resume and professional credentials.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="rounded-[10px] bg-[#F4F6FC] p-6 sm:p-8"
            >
              <div className="flex justify-center items-center bg-[#2405F2] text-white text-center rounded-md h-[30px] w-[30px] mb-4">
                {item.number}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EduZoneBenefits;
