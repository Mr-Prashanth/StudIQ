// components/MyCourses.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      setCourses(res.data.courses);
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
        <ul className="space-y-4">
          {courses.map((course) => (
            <li
              key={course.course_id}
              className="p-4 border rounded-lg hover:shadow-md transition cursor-pointer flex justify-between items-center"
              onClick={() => navigate(`/teacher/${course.course_id}`)}
            >
              <div>
                <h3 className="font-bold text-lg text-blue-600">{course.course_name}</h3>
                <p className="text-gray-500 text-sm">{course.department} | Credits: {course.credits}</p>
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {course.studentCount} Students
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCourses;
