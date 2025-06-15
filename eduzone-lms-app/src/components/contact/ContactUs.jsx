import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-white text-[#1C1E53] min-h-screen flex flex-col justify-center items-center px-4 py-12">
      <div className=" w-full  rounded-xlp-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Have a question or need help? We'd love to hear from you. Fill out the
          form below and our team will get back to you shortly.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCD980]"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCD980]"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCD980]"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FCD980]"
          ></textarea>
          <button
            type="submit"
            className="bg-[#FCD980] text-[#000000] font-semibold py-3 px-8 rounded-md hover:bg-[#f4c44f] transition-colors duration-300 w-full md:w-auto"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-10 text-center">
          <p className="text-gray-700">Or reach us directly:</p>
          <p className="font-semibold mt-1">+6288 999 222 333</p>
          <p className="font-semibold">info@eduzone.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
