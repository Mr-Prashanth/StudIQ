import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [teacher, setTeacher] = useState({ name: '', email: '', password: '' });
  const [student, setStudent] = useState({ name: '', email: '', password: '', department: '' });

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/add-teacher', teacher);
      alert("✅ Teacher added successfully");
      setTeacher({ name: '', email: '', password: '' });
    } catch (err) {
  if (err.response?.data?.error === "Email already exists") {
    alert("⚠️ Email already exists!");
  } else {
    alert("❌ Error adding teacher");
  }
  console.error(err);
}

  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/add-student', student);
      alert("✅ Student added successfully");
      setStudent({ name: '', email: '', password: '', department: '' });
    } catch (err) {
  if (err.response?.data?.error === "Email already exists") {
    alert("⚠️ Email already exists!");
  } else {
    alert("❌ Error adding teacher");
  }
  console.error(err);
}

  };

  return (
    <div className="mt-32 ml-40 mr-40 mb-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">🛠️ Admin Control Panel</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Teacher Form */}
        <form onSubmit={handleTeacherSubmit} className="bg-white p-8 shadow-lg rounded-2xl space-y-4 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">👨‍🏫 Add Teacher</h3>

          <input type="text" placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={teacher.name} onChange={e => setTeacher({ ...teacher, name: e.target.value })} required />

          <input type="email" placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={teacher.email} onChange={e => setTeacher({ ...teacher, email: e.target.value })} required />

          <input type="password" placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={teacher.password} onChange={e => setTeacher({ ...teacher, password: e.target.value })} required />

          <button type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition">
            ➕ Add Teacher
          </button>
        </form>

        {/* Student Form */}
        <form onSubmit={handleStudentSubmit} className="bg-white p-8 shadow-lg rounded-2xl space-y-4 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">🎓 Add Student</h3>

          <input type="text" placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            value={student.name} onChange={e => setStudent({ ...student, name: e.target.value })} required />

          <input type="email" placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            value={student.email} onChange={e => setStudent({ ...student, email: e.target.value })} required />

          <input type="password" placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            value={student.password} onChange={e => setStudent({ ...student, password: e.target.value })} required />

          <input type="text" placeholder="Department"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            value={student.department} onChange={e => setStudent({ ...student, department: e.target.value })} required />

          <button type="submit"
            className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
            ➕ Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
