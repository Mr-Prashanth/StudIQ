// pages/MarkAttendancePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MarkAttendancePage = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(`http://localhost:5000/api/course/${courseId}/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStudents(res.data.students);
      const defaultAttendance = {};
      res.data.students.forEach(s => defaultAttendance[s.user_id] = 'present');
      setAttendance(defaultAttendance);
    };
    fetchStudents();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = `${date}T${time}:00`;
      const payload = Object.entries(attendance).map(([student_id, status]) => ({
        course_id: courseId,
        student_id,
        date: formattedDate,
        status,
      }));

      await axios.post('http://localhost:5000/api/attendance/mark', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      alert('✅ Attendance marked!');
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('❌ Error marking attendance');
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">📝 Mark Attendance</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border-t-4 border-indigo-600">
        <div className="flex gap-4 mb-6">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded-lg w-full" required />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded-lg w-full" required />
        </div>

        {students.length === 0 ? (
          <p>No students enrolled.</p>
        ) : (
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Student Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.user_id} className="border-t">
                  <td className="p-2">{student.name}</td>
                  <td className="p-2">{student.email}</td>
                  <td className="p-2">
                    <select
                      value={attendance[student.user_id] || 'present'}
                      onChange={(e) =>
                        setAttendance({ ...attendance, [student.user_id]: e.target.value })
                      }
                      className="border p-1 rounded"
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700">
          ✅ Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default MarkAttendancePage;
