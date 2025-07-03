import express from 'express';
import { uploadMaterial, getCourseMaterials, upload } from '../controllers/lectureController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/upload', verifyToken, upload.single('file'), uploadMaterial);
router.get('/:courseId', verifyToken, getCourseMaterials);

export default router;
