import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/course/student-courses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error("Error fetching student courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentCourses();
  }, []);

  const handleViewCourse = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="bg-white min-h-screen pt-[120px] px-6 text-black ml-40 mr-40">
      <h2 className="text-2xl font-bold mb-6">📘 Enrolled Courses</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading your courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500">You are not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="rounded-xl shadow-md p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-1">{course.course_name}</h3>
              {course.department && <p className="text-sm">{course.department}</p>}
              {course.credits && <p className="text-xs mt-2 italic">Credits: {course.credits}</p>}

              <div className="mt-4 text-right">
                <button
                  onClick={() => handleViewCourse(course.course_id)}
                  className="text-sm px-4 py-1 bg-white text-black rounded-full hover:bg-gray-100 transition"
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
