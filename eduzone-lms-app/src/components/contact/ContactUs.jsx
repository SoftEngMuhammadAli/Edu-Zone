import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="text-left ml-4 md:ml-10 mt-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1C1E53]">
          Contact Us
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl">
          Have a question or feedback? Reach out to us using the form below or
          via our contact details.
        </p>
      </div>

      <section className="min-h-screen flex items-stretch justify-center px-0 py-10">
        {/* Like Flutter Row */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Left: Expanded - Full height and width 50% */}
          <div className="bg-[#1C1E53] text-white w-full md:w-1/2 p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                We're here to answer any questions you may have. Send us a
                message and our team will respond shortly.
              </p>
            </div>
            <div className="mt-10 space-y-2">
              <p className="text-lg font-medium">📞 +6288 999 222 333</p>
              <p className="text-lg font-medium">📧 info@eduzone.com</p>
              <p className="text-gray-400 text-sm mt-4">
                🕘 Office Hours: Mon - Fri, 9am - 5pm
              </p>
            </div>
          </div>

          {/* Right: Card stays fixed max-w like Flutter Container inside Expanded */}
          <div className="bg-white w-full md:max-w-[700px] p-6 md:p-10 shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
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
      </section>
    </>
  );
};

export default ContactUs;
