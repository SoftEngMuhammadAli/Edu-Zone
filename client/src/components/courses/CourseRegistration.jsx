import React from "react";
import registerSideImage from "../../assets/images/auth/signup-side-image.png";

const CourseRegistration = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image and Text */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center flex items-center justify-center p-8 md:p-16 text-white"
        style={{ backgroundImage: `url(${registerSideImage})` }}
      >
        <div className="bg-black bg-opacity-60 p-6 md:p-8 rounded-lg max-w-xl text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            One Step Closer To Your Dream
          </h1>
          <p className="text-base md:text-lg">
            A free E-Learning service that is ready to help you become an
            expert.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full md:w-1/2 bg-[#1C1E53] flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Register
          </h2>
          <p className="text-sm text-white mb-8">Please Register yourself!</p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-3 rounded bg-[#2D2F6B] text-white placeholder-gray-300 focus:outline-none"
              required
            />

            <input
              type="email"
              placeholder="Enter your Email"
              className="w-full p-3 rounded bg-[#2D2F6B] text-white placeholder-gray-300 focus:outline-none"
              required
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded bg-[#2D2F6B] text-white placeholder-gray-300 focus:outline-none"
              required
            />

            <button
              onClick={() => {
                alert("This feature is not implemented yet!");
              }}
              type="submit"
              className="w-full py-3 bg-yellow-400 text-[#000000] font-semibold rounded hover:bg-yellow-500 transition"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
