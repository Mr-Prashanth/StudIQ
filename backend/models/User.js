// models/User.js
const User = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    token: {
  type: DataTypes.STRING,
  allowNull: true
},
    role: {
      type: DataTypes.STRING,
      defaultValue: "student",
    },
  });
};

export default User;
