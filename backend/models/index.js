// models/index.js
import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';
import AnnouncementModel from './Announcement.js';
import AttendanceModel from './Attendance.js';
import UserModel from './User.js';
import StudentDetailModel from './StudentDetail.js';
import TeacherDetailModel from './TeacherDetail.js';
import CourseModel from './Course.js';
import EnrollmentModel from './Enrollment.js';
import CourseMaterialModel from './CourseMaterial.js';

const User = UserModel(sequelize, DataTypes);
const StudentDetail = StudentDetailModel(sequelize, DataTypes);
const TeacherDetail = TeacherDetailModel(sequelize, DataTypes);
const Course = CourseModel(sequelize, DataTypes);
const Enrollment = EnrollmentModel(sequelize, DataTypes);
const CourseMaterial = CourseMaterialModel(sequelize, DataTypes);
const Announcement = AnnouncementModel(sequelize, DataTypes);
const Attendance = AttendanceModel(sequelize, DataTypes);

// 🔁 Associations
User.hasOne(StudentDetail, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(TeacherDetail, { foreignKey: 'user_id', onDelete: 'CASCADE' });

StudentDetail.belongsTo(User, { foreignKey: 'user_id' });
TeacherDetail.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Enrollment, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });

Course.hasMany(Enrollment, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

Course.hasMany(CourseMaterial, { foreignKey: 'course_id', onDelete: 'CASCADE' });
User.hasMany(CourseMaterial, { foreignKey: 'uploaded_by', onDelete: 'SET NULL' });

CourseMaterial.belongsTo(Course, { foreignKey: 'course_id' });
CourseMaterial.belongsTo(User, { foreignKey: 'uploaded_by' });

Course.hasMany(Announcement, { foreignKey: 'course_id', onDelete: 'CASCADE' });
User.hasMany(Announcement, { foreignKey: 'posted_by', onDelete: 'SET NULL' });
Announcement.belongsTo(Course, { foreignKey: 'course_id' });
Announcement.belongsTo(User, { foreignKey: 'posted_by' });

Course.hasMany(Attendance, { foreignKey: 'course_id', onDelete: 'CASCADE' });
User.hasMany(Attendance, { foreignKey: 'student_id', onDelete: 'CASCADE' });
Attendance.belongsTo(Course, { foreignKey: 'course_id' });
Attendance.belongsTo(User, { foreignKey: 'student_id' });
Announcement.belongsTo(User, {
  foreignKey: 'posted_by',
  as: 'poster'
});

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection successful.");
    await sequelize.sync({ alter: true });
    console.log("📦 All models synced.");
  } catch (error) {
    console.error("❌ DB sync error", error);
  }
};

export {
  sequelize,
  User,
  StudentDetail,
  TeacherDetail,
  Course,
  Enrollment,
  CourseMaterial,
  Announcement,
  Attendance,
  syncDatabase,
};
