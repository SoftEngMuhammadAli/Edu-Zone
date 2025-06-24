import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9fafb] px-4 text-center">
      <h1 className="text-6xl font-bold text-[#2D2F6B] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-[#2D2F6B] text-white rounded-md hover:bg-[#1c1d4f] transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
