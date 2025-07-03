// routes/announcementRoutes.js
import express from 'express';
import { verifyToken } from '../middlewares/auth.js';
import {
  postAnnouncement,
  getCourseAnnouncements,
} from '../controllers/announcementController.js';

const router = express.Router();

// Route to post announcement (teacher only)
router.post('/', verifyToken, postAnnouncement);

// Route to fetch announcements for a specific course (for both students and teachers)
router.get('/:courseId', verifyToken, getCourseAnnouncements);

export default router;
