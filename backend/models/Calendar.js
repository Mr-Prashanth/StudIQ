// models/calendar.js

export default (sequelize, DataTypes) => {
  const Calendar = sequelize.define("Calendar", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Calendar.associate = (models) => {
    Calendar.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };

  return Calendar;
};
