const StudentDetail = (sequelize, DataTypes) => {
  return sequelize.define('StudentDetail', {
    user_id: {
      type: DataTypes.INTEGER,
            autoIncrement: true, // ✅ Add this line

      primaryKey: true,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  }, {
    tableName: 'student_details',
    timestamps: false,
  });
};
export default StudentDetail;