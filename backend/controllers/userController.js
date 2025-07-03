import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, StudentDetail } from '../models/index.js';

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


// REGISTER USER (Traditional)
export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role: 'student',
      token: '', // placeholder for now
    });

    const token = generateToken(user.user_id, email);
    await user.update({ token });

    // Automatically insert into student_details
    await StudentDetail.create({ user_id: user.user_id });

    res.status(201).json({ message: "Account created", token, user });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email already exists" });
    }
    console.error("Registration error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// LOGIN USER (Traditional)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user.user_id, email, user.role); // include role in token
    await user.update({ token });

    const studentDetail = await StudentDetail.findOne({ where: { user_id: user.user_id } });

    res.status(200).json({ message: "Login successful", token, user, studentDetail });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET USER PROFILE (Protected route)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const studentDetail = await StudentDetail.findOne({ where: { user_id: user.user_id } });

    res.status(200).json({ user, studentDetail });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
