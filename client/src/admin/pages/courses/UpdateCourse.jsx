import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../../../features/admin/courseSlice";

const UpdateCoursePage = ({ course }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.course);

  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    duration: course.duration,
    level: course.level,
    category: course.category,
    assignment: course.assignment,
    lesson: course.lesson,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCourse({ id: course._id, courseData: formData }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-6">Update Course</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {[
          "title",
          "description",
          "duration",
          "category",
          "assignment",
          "lesson",
        ].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>

        {error && <p className="text-red-600 text-sm pt-2">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateCoursePage;
