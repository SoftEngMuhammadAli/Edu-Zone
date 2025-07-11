import React from "react";

const DeleteCoursePage = () => {
  const courses = [
    {
      _id: "1",
      title: "JavaScript Basics",
      category: "Development",
      students: 150,
    },
    {
      _id: "2",
      title: "UX Fundamentals",
      category: "Design",
      students: 90,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Delete Courses</h1>
      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Enrolled</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="border-t text-sm">
              <td className="p-3">{course.title}</td>
              <td className="p-3">{course.category}</td>
              <td className="p-3">{course.students}</td>
              <td className="p-3 text-center">
                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteCoursePage;
