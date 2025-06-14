import React from "react";
import { useNavigate } from "react-router-dom";
import registerSideImage from "../assets/images/signup-side-image.png";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Image and Text */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center flex items-center justify-center p-8 md:p-16 text-white"
        style={{ backgroundImage: `url(${registerSideImage})` }}
      >
        <div className="bg-black bg-opacity-60 p-6 md:p-8 rounded-lg max-w-xl text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
            Selangkah Lebih Dekat Dengan Impianmu
          </h1>
          <p className="text-base md:text-lg">
            Sebuah layanan E-Learning gratis yang siap membantumu menjadi
            seorang ahli.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full md:w-1/2 bg-[#1C1E53] flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Register
          </h2>
          <p className="text-sm text-white mb-8">
            Please Register to you Account!
          </p>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/");
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
              type="submit"
              className="w-full py-3 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
            >
              SIGN UP
            </button>
          </form>

          <p className="text-sm text-white mt-6 text-center">
            Already have Account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-yellow-400 underline hover:text-yellow-300"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
