import React from "react";

const UpdateCoursePage = () => {
  const course = {
    title: "JavaScript Basics",
    description: "Learn the basics of JS from scratch",
    duration: "6 weeks",
    level: "Beginner",
    category: "Development",
    images: ["js-cover.png"],
    assignment: "60f9abc123",
    lesson: "60f9def456",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-6">Update Course</h1>

      <form className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            defaultValue={course.title}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            rows="4"
            defaultValue={course.description}
            className="w-full px-4 py-2 border rounded"
          ></textarea>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            type="text"
            defaultValue={course.duration}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium">Level</label>
          <select
            defaultValue={course.level}
            className="w-full px-4 py-2 border rounded"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            defaultValue={course.category}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Assignment and Lesson */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Assignment ID</label>
            <input
              type="text"
              defaultValue={course.assignment}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Lesson ID</label>
            <input
              type="text"
              defaultValue={course.lesson}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium">Upload New Images</label>
          <input type="file" multiple className="w-full" />
          <p className="text-sm mt-1 text-gray-600">
            Current: {course.images.join(", ")}
          </p>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCoursePage;
