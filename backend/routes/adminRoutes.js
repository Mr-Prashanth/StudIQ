// routes/adminRoutes.js
import express from 'express';
import { addTeacher, addStudent } from '../controllers/adminController.js';

const router = express.Router();

router.post('/add-teacher', addTeacher);
router.post('/add-student', addStudent);

export default router;
