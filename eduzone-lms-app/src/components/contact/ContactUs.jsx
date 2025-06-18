import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-white text-black py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1E53]">
            Contact Us
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-2 max-w-xl">
            Have a question or feedback? Reach out to us using the form below or
            via our contact details.
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row items-stretch w-full shadow-lg rounded-lg overflow-hidden">
          {/* Left Panel */}
          <div className="bg-[#1C1E53] text-white w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                We're here to answer any questions you may have. Send us a
                message and our team will respond shortly.
              </p>
            </div>
            <div className="mt-10 space-y-2">
              <p className="text-base md:text-lg font-medium">
                <a href="tel:+6288 999 222 333">📞 +6288 999 222 333</a>
              </p>
              <p className="text-base md:text-lg font-medium">
                <a href="mailto:info@eduzone.com">📧 info@eduzone.com</a>
              </p>
              <p className="text-xs md:text-sm text-gray-400 mt-4">
                🕘 Office Hours: Mon - Fri, 9am - 5pm
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-white w-full md:w-1/2 p-6 sm:p-8 md:p-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
              Send us a message
            </h3>
            <form className="space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCD980] transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCD980] transition"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCD980] transition"
              />
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FCD980] transition resize-none"
              ></textarea>
              <button
                type="submit"
                className="bg-[#FCD980] hover:bg-[#f4c44f] text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full md:w-fit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
