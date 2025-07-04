import express from 'express';
import {
  markAttendance,
  getStudentAttendance,
  getMyAttendance
} from '../controllers/attendanceController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// POST /api/attendance/mark
router.post('/mark', verifyToken, markAttendance);

// GET /api/attendance/:course_id/student/:student_id
router.get('/:course_id/student/:student_id', verifyToken, getStudentAttendance);

// GET /api/attendance/:course_id/student - gets attendance for current user
router.get('/:course_id/student', verifyToken, getMyAttendance);

export default router;