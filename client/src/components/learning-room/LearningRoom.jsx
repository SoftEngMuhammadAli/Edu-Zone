import React from "react";

const LearningRoom = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e2344] text-white p-6 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">EDU-ZONE</h1>

        {/* Progress */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-1">Progress</h3>
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{ width: "20%" }}
            />
          </div>
          <p className="text-xs mt-1">4 of 20 modules completed</p>
        </div>

        {/* Course Modules */}
        <nav className="space-y-6 text-sm">
          <div>
            <h4 className="text-purple-300 mb-1 uppercase">Introduction</h4>
            <ul className="ml-3 space-y-1">
              <li className="cursor-pointer hover:text-yellow-400">
                Meet Your Instructor
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-purple-300 mb-1 uppercase">Installation</h4>
            <ul className="ml-3 space-y-1">
              <li className="cursor-pointer hover:text-yellow-400">
                Download Tools
              </li>
              <li className="text-yellow-400 font-semibold cursor-pointer">
                Install the Tools
              </li>
              <li className="cursor-pointer hover:text-yellow-400">
                Basic Usage
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-purple-300 mb-1 uppercase">HTML Basics</h4>
            <ul className="ml-3 space-y-1">
              <li className="cursor-pointer hover:text-yellow-400">
                What is HTML?
              </li>
              <li className="cursor-pointer hover:text-yellow-400">
                Running HTML Code
              </li>
              <li className="cursor-pointer hover:text-yellow-400">Tags</li>
              <li className="cursor-pointer hover:text-yellow-400">
                Headings & Paragraphs
              </li>
              <li className="cursor-pointer hover:text-yellow-400">Links</li>
              <li className="cursor-pointer hover:text-yellow-400">Tables</li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button className="md:hidden text-2xl">☰</button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Hi, Dimas</p>
              <p className="font-semibold">Frontend Developer</p>
            </div>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>

        {/* Video Player Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-600">
            Web Development Fundamentals
          </h2>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Tool Installation
          </h1>

          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden shadow">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="EDU-ZONE Course Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full min-h-screen"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded font-semibold text-sm">
            ← Back
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-300 px-5 py-2 rounded font-semibold text-sm">
            Mark as Complete → Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default LearningRoom;
