// controllers/attendanceController.js
import { Attendance, Enrollment, User } from '../models/index.js';

// ✅ POST: Mark attendance for multiple students
export const markAttendance = async (req, res) => {
  try {
    const attendanceRecords = req.body; // [{ course_id, student_id, date, status }]

    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      return res.status(400).json({ error: 'Invalid attendance payload' });
    }

    await Promise.all(
      attendanceRecords.map(async (record) => {
        const { course_id, student_id, date, status } = record;

        // Optional: validate student is enrolled in course
        const isEnrolled = await Enrollment.findOne({
          where: { user_id: student_id, course_id },
        });

        if (!isEnrolled) {
          throw new Error(`Student ${student_id} is not enrolled in course ${course_id}`);
        }

        await Attendance.create({
          course_id,
          student_id,
          date,
          status,
        });
      })
    );

    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error('markAttendance error:', err);
    res.status(500).json({ error: 'Failed to mark attendance' });
  }
};

// ✅ GET: View attendance of a student in a course
export const getStudentAttendance = async (req, res) => {
  const { course_id, student_id } = req.params;

  try {
    const records = await Attendance.findAll({
      where: { course_id, student_id },
      order: [['date', 'ASC']],
    });

    res.status(200).json({ attendance: records });
  } catch (err) {
    console.error('getStudentAttendance error:', err);
    res.status(500).json({ error: 'Failed to retrieve attendance' });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const { course_id } = req.params;
    const student_id = req.user.id; // From JWT token

    const attendance = await Attendance.findAll({
      where: {
        course_id,
        student_id
      },
      order: [['date', 'DESC']]
    });

    res.json({ attendance });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
};