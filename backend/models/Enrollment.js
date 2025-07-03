const Enrollment = (sequelize, DataTypes) => {
  return sequelize.define('Enrollment', {
    enrollment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    course_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    tableName: 'enrollments',
    timestamps: false,
  });
};

export default Enrollment;
