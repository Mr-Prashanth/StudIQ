// controllers/announcementController.js
import { Announcement, Enrollment, User } from '../models/index.js';

// Create announcement for a course
export const postAnnouncement = async (req, res) => {
  const { course_id, title, message } = req.body;
  const posted_by = req.user.id;

  if (!course_id || !title || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Optional: Verify if the teacher is enrolled in the course
    const teacherEnrolled = await Enrollment.findOne({
      where: { user_id: posted_by, course_id },
    });

    if (!teacherEnrolled) {
      return res.status(403).json({ error: 'You are not authorized to post to this course' });
    }

    const newAnnouncement = await Announcement.create({
      course_id,
      posted_by,
      title,
      message,
    });

    res.status(201).json({ message: 'Announcement posted', announcement: newAnnouncement });
  } catch (err) {
    console.error('Post announcement error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get announcements for a course
export const getCourseAnnouncements = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.id;
  console.log('Fetching announcements for course:', courseId, 'by user:', userId);

  try {
    // Check if user is enrolled in the course
    const isEnrolled = await Enrollment.findOne({
      where: { user_id: userId, course_id: courseId },
    });

    if (!isEnrolled) {
      return res.status(403).json({ error: 'Not enrolled in this course' });
    }

    const announcements = await Announcement.findAll({
      where: { course_id: courseId },
      order: [['posted_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'poster',
          attributes: ['name', 'email'],
        },
      ],
    });

    res.status(200).json({ announcements });
  } catch (err) {
    console.error('Get announcements error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
