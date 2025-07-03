const TeacherDetail = (sequelize, DataTypes) => {
  return sequelize.define('TeacherDetail', {
    teacher_id: {
      type: DataTypes.INTEGER,
            autoIncrement: true, // ✅ Add this line

      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
  }, {
    tableName: 'teacher_details',
    timestamps: false,
  });
};

export default TeacherDetail;
