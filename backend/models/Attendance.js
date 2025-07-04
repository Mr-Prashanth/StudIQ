const Attendance = (sequelize, DataTypes) => {
  return sequelize.define('Attendance', {
    attendance_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'present',
    },
    marked_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'attendance',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['course_id', 'student_id', 'date'],
      },
    ],
  });
};

export default Attendance;
