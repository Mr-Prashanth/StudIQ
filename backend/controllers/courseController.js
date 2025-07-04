import { User, Course, Enrollment } from '../models/index.js';

// Create a new course using JWT-authenticated teacher
export const createCourse = async (req, res) => {
  const { course_name, description, department, credits } = req.body;
  const teacher_id = req.user.id; // ✅ from token

  if (!course_name || !teacher_id) {
    return res.status(400).json({ error: 'Course name and teacher ID are required.' });
  }

  try {
    const course = await Course.create({ course_name, description, department, credits });

    // Enroll the teacher as the creator
    await Enrollment.create({
      user_id: teacher_id,
      course_id: course.course_id,
    });

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get courses created/enrolled by the logged-in teacher
export const getTeacherCourses = async (req, res) => {
  const teacher_id = req.user.id;

  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id: teacher_id },
      attributes: ['course_id'],
    });

    const courseIds = enrollments.map((e) => e.course_id);

    const courses = await Course.findAll({
      where: { course_id: courseIds },
    });

    res.status(200).json({ courses });
  } catch (err) {
    console.error("Fetch teacher courses error:", err);
    res.status(500).json({ error: "Server error while fetching courses" });
  }
};

// Enroll a student using their email
export const enrollStudent = async (req, res) => {
  const { email, course_id } = req.body;

  if (!email || !course_id) {
    return res.status(400).json({ error: 'Student email and course ID are required.' });
  }

  try {
    const student = await User.findOne({ where: { email, role: 'student' } });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const course = await Course.findByPk(course_id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      where: { user_id: student.user_id, course_id },
    });

    if (alreadyEnrolled) {
      return res.status(409).json({ error: 'Student already enrolled in this course.' });
    }

    await Enrollment.create({
      user_id: student.user_id,
      course_id,
    });

    res.status(200).json({ message: 'Student enrolled successfully' });
  } catch (error) {
    console.error('Enroll student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get teacher courses with student count
export const getCoursesWithStudentCount = async (req, res) => {
  const teacher_id = req.user.id;

  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id: teacher_id },
      attributes: ['course_id'],
    });

    const courseIds = enrollments.map(e => e.course_id);

    const courses = await Course.findAll({
      where: { course_id: courseIds },
    });

    const enriched = await Promise.all(
      courses.map(async (course) => {
        const count = await Enrollment.count({ where: { course_id: course.course_id } });
        return { ...course.toJSON(), studentCount: count - 1 }; // subtract 1 for the teacher
      })
    );

    res.status(200).json({ courses: enriched });
  } catch (err) {
    console.error("getCoursesWithStudentCount error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all courses a student is enrolled in
export const getStudentCourses = async (req, res) => {
  const student_id = req.user.id;

  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id: student_id },
      attributes: ['course_id'],
    });

    const courseIds = enrollments.map(e => e.course_id);

    const courses = await Course.findAll({
      where: { course_id: courseIds },
    });

    res.status(200).json({ courses });
  } catch (err) {
    console.error("getStudentCourses error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a course by ID
export const getCourseById = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // For now, announcements are dummy
    const announcements = ['Assignment due Friday', 'Quiz on Monday'];

    res.status(200).json({ course, announcements });
  } catch (err) {
    console.error('getCourseById error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get students enrolled in a specific course
export const getStudentsInCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await Enrollment.findAll({
      where: { course_id: courseId },
      include: {
        model: User,
        attributes: ['user_id', 'name', 'email'],
        where: { role: 'student' },
      },
    });

    const students = enrollments.map((e) => e.User);
    res.status(200).json({ students });
  } catch (err) {
    console.error('getStudentsInCourse error:', err);
    res.status(500).json({ error: 'Server error while fetching students' });
  }
};
