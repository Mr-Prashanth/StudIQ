const Course = (sequelize, DataTypes) => {
  return sequelize.define('Course', {
    course_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    course_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    department: {
      type: DataTypes.STRING(50),
    },
    credits: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
  }, {
    tableName: 'courses',
    timestamps: false,
  });
};

export default Course;
