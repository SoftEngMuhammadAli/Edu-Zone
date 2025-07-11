import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../../features/admin/courseSlice";

const CreateCoursePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.course);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const courseData = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      duration: form.duration.value,
      level: form.level.value,
      images: [], // handle file uploads separately if needed
      assignment: form.assignment.value,
      lesson: form.lesson.value,
    };

    dispatch(createCourse(courseData));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-semibold mb-6">Create New Course</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full px-4 py-2 border rounded"
        />
        <select name="category" className="w-full px-4 py-2 border rounded">
          <option value="dev">Development</option>
          <option value="design">Design</option>
        </select>
        <input
          name="duration"
          placeholder="Duration"
          className="w-full px-4 py-2 border rounded"
        />
        <select name="level" className="w-full px-4 py-2 border rounded">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input
          name="assignment"
          placeholder="Assignment ID"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="lesson"
          placeholder="Lesson ID"
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default CreateCoursePage;
