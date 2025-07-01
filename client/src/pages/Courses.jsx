import React from 'react';
import { useNavigate } from 'react-router-dom';

const staticCourses = [
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    semester: 'Semester 5',
    department: 'CSE - AI & ML',
    color: 'bg-gradient-to-r from-purple-400 to-indigo-500',
  },
  {
    id: 'data-structures-and-algorithms',
    title: 'Data Structures & Algorithms',
    semester: 'Semester 3',
    department: 'CSE Core',
    color: 'bg-gradient-to-r from-blue-400 to-blue-600',
  },
  {
    id: 'database-management-systems',
    title: 'Database Management Systems',
    semester: 'Semester 4',
    department: 'CSE - Database',
    color: 'bg-gradient-to-r from-teal-400 to-cyan-500',
  },
];

const Courses = () => {
  const navigate = useNavigate();

  const handleViewCourse = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="bg-white min-h-screen pt-[120px] px-6 text-black ml-40 mr-40">
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticCourses.map((course, idx) => (
          <div
            key={idx}
            className={`rounded-xl shadow-md p-5 text-white cursor-pointer transform hover:scale-[1.02] transition-all duration-300 ${course.color}`}
          >
            <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
            <p className="text-sm">{course.semester}</p>
            <p className="text-xs mt-2 italic">{course.department}</p>

            <div className="mt-4 text-right">
              <button
                onClick={() => handleViewCourse(course.id)}
                className="text-sm px-4 py-1 bg-white text-black rounded-full hover:bg-gray-100 transition"
              >
                View Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
