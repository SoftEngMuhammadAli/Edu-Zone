import React from "react";

const CreateCoursePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-6">Create New Course</h1>

      <form className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="Course title"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            rows="5"
            placeholder="Course description"
            className="w-full px-4 py-2 border rounded"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select className="w-full px-4 py-2 border rounded">
            <option>Select category</option>
            <option value="dev">Development</option>
            <option value="design">Design</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            type="text"
            placeholder="e.g. 8 weeks"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium">Level</label>
          <select className="w-full px-4 py-2 border rounded">
            <option>Select level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium">Upload Images</label>
          <input type="file" multiple className="w-full" />
        </div>

        {/* Assignment & Lesson IDs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Assignment ID</label>
            <input
              type="text"
              placeholder="Assignment ObjectId"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Lesson ID</label>
            <input
              type="text"
              placeholder="Lesson ObjectId"
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCoursePage;
