import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourse,
  fetchCourses,
} from "../../../features/admin/courseSlice";

const DeleteCoursePage = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse({ id }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Delete Courses</h1>

      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="border-t text-sm">
              <td className="p-3">{course.title}</td>
              <td className="p-3">{course.category}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {courses.length === 0 && !loading && (
            <tr>
              <td colSpan="3" className="text-center py-6 text-gray-500">
                No courses available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteCoursePage;
