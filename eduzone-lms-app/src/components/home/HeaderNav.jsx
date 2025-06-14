import React, { useState } from "react";

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#1C1E53] text-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-semibold underline">EduZone</h1>

        {/* Hamburger Icon - Visible on Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden md:flex gap-6 text-white text-base">
          <a href="#">Home</a>
          <a href="#">Courses</a>
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
          <a href="#">Need Help?</a>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-4 text-white text-base">
            <a href="#">Home</a>
            <a href="#">Courses</a>
            <a href="#">Contact Us</a>
            <a href="#">About Us</a>
            <a href="#">Need Help?</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
