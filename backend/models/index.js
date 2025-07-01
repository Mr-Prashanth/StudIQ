// models/index.js
import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';
import UserModel from './User.js';

const User = UserModel(sequelize, DataTypes);

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection successful.");
    await sequelize.sync({alter: true});
    console.log("📦 All models synced.");
  } catch (error) {
    console.error("❌ DB sync error", error);
  }
};

export { sequelize, User, syncDatabase };
