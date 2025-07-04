import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#1C1E53] text-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo/Name */}
        <Link to="/home" className="text-2xl font-semibold underline">
          EduZone
        </Link>

        {/* Hamburger Icon */}
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

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-white text-base">
          <Link to="/home">Home</Link>
          <Link to="/seeAllCourses">Courses</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
          <Link to="/help">Need Help?</Link>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-4 text-white text-base">
            <Link to="/home" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/seeAllCourses" onClick={() => setIsMenuOpen(false)}>
              Courses
            </Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link
              to="/terms-and-conditions"
              onClick={() => setIsMenuOpen(false)}
            >
              Terms and Conditions
            </Link>
            <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)}>
              Privacy Policy
            </Link>
            <Link to="/help" onClick={() => setIsMenuOpen(false)}>
              Need Help?
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderNav;
