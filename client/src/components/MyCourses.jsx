// components/MyCourses.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaChalkboardTeacher, FaBullhorn, FaClipboardCheck } from 'react-icons/fa';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCoursesWithStudentCount = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/course/with-students', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error('Error fetching teacher courses:', err);
    }
  };

  useEffect(() => {
    fetchCoursesWithStudentCount();
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">📖 My Courses</h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <ul className="space-y-6">
          {courses.map((course) => (
            <li
              key={course.course_id}
              className="p-6 border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-bold text-xl text-blue-600">{course.course_name}</h3>
                  <p className="text-gray-600 text-sm">
                    {course.department} | Credits: {course.credits}
                  </p>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow">
                  {course.studentCount} Students
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-2">
                <button
                  onClick={() => navigate(`/teacher/${course.course_id}`)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition text-sm font-medium"
                >
                  <FaChalkboardTeacher />
                  Course Page
                </button>

                <button
                  onClick={() => navigate(`/teacher/${course.course_id}/mark-attendance`)}
                  className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 transition text-sm font-medium"
                >
                  <FaClipboardCheck />
                  Mark Attendance
                </button>

                <button
                  onClick={() => navigate(`/teacher/${course.course_id}#announcement`)}
                  className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition text-sm font-medium"
                >
                  <FaBullhorn />
                  Post Announcement
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
