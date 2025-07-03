import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import MyCourses from '../components/MyCourses';

const TeacherPanel = () => {
  const [course, setCourse] = useState({
    course_name: '',
    description: '',
    department: '',
    credits: ''
  });
  const [studentEnrollment, setStudentEnrollment] = useState({
    email: '',
    course_id: '',
  });
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/course', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/course/create-course', course, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await fetchCourses();
      alert("✅ Course created successfully");
      setCourse({ course_name: '', description: '', department: '', credits: '' });
    } catch (err) {
      alert("❌ Error creating course");
      console.error(err);
    }
  };

  const handleEnrollStudent = async (e) => {
    e.preventDefault();
    try {
      console.log("Enrolling student:", studentEnrollment);
      await axios.post('http://localhost:5000/api/course/enroll-student', studentEnrollment, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("✅ Student enrolled successfully");
      setStudentEnrollment({ email: '', course_id: '' });
    } catch (err) {
      alert("❌ Error enrolling student");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Navbar />

      <main className="mt-36 mx-6 lg:mx-40 mb-16">
        <h1 className="text-5xl font-extrabold text-center text-indigo-700 mb-16 drop-shadow-md">👨‍🏫 Teacher Control Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Create Course Form */}
          <form onSubmit={handleCreateCourse} className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-500">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">📘 Create Course</h2>

            <input type="text" placeholder="Course Name" value={course.course_name}
              onChange={(e) => setCourse({ ...course, course_name: e.target.value })}
              className="w-full mb-4 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-sm" required />

            <textarea placeholder="Description" value={course.description}
              onChange={(e) => setCourse({ ...course, description: e.target.value })}
              className="w-full mb-4 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-sm" />

            <input type="text" placeholder="Department" value={course.department}
              onChange={(e) => setCourse({ ...course, department: e.target.value })}
              className="w-full mb-4 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-sm" />

            <input type="number" placeholder="Credits" value={course.credits}
              onChange={(e) => setCourse({ ...course, credits: e.target.value })}
              className="w-full mb-6 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-sm" />

            <button type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition shadow-md">
              ➕ Add Course
            </button>
          </form>

          {/* Enroll Student Form */}
          <form onSubmit={handleEnrollStudent} className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-green-500">
            <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">🧑‍🎓 Enroll Student</h2>

            <input type="email" placeholder="Student Email" value={studentEnrollment.email}
              onChange={(e) => setStudentEnrollment({ ...studentEnrollment, email: e.target.value })}
              className="w-full mb-4 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none text-sm" required />

            <select value={studentEnrollment.course_id}
              onChange={(e) => setStudentEnrollment({ ...studentEnrollment, course_id: e.target.value })}
              className="w-full mb-6 px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none text-sm" required>
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.course_id} value={c.course_id}>{c.course_name}</option>
              ))}
            </select>

            <button type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition shadow-md">
              ➕ Enroll
            </button>
          </form>
        </div>

        {/* MyCourses Component */}
        <MyCourses />
      </main>
    </div>
  );
};

export default TeacherPanel;
