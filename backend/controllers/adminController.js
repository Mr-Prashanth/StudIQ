// controllers/adminController.js
import bcrypt from 'bcryptjs';
import { User, TeacherDetail, StudentDetail } from '../models/index.js';

export const addTeacher = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash: hashedPassword, role: 'teacher' });
    await TeacherDetail.create({ user_id: user.user_id });

    res.status(201).json({ message: "Teacher added", user });
  } catch (err) {
    console.error("Add teacher error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const addStudent = async (req, res) => {
  const { name, email, password, department } = req.body;
  if (!name || !email || !password || !department) return res.status(400).json({ error: "All fields required" });

  try {
    const existingUser = await User.findOne({ where: { email } });
if (existingUser) {
  return res.status(409).json({ error: "Email already exists" });
}

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash: hashedPassword, role: 'student' });
    await StudentDetail.create({ user_id: user.user_id, department });

    res.status(201).json({ message: "Student added", user });
  } catch (err) {
    console.error("Add student error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
