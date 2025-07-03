import express from 'express';
import {
  createCourse,
  enrollStudent,
  getTeacherCourses,
  getCoursesWithStudentCount,
  getStudentCourses,
  getCourseById,
  getStudentsInCourse
} from '../controllers/courseController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create-course', verifyToken, createCourse);
router.post('/enroll-student', verifyToken, (req, res, next) => {
  console.log('Enroll student route hit ✅');
  next();
}, enrollStudent);
router.get('/', verifyToken, getTeacherCourses); 
router.get('/with-students', verifyToken, getCoursesWithStudentCount);
router.get('/student-courses', verifyToken, getStudentCourses); // ✅ new route
router.get('/:courseId', verifyToken, getCourseById);
router.get('/:courseId/students', verifyToken, getStudentsInCourse);



export default router;
