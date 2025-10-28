// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/housemakka");
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

module.exports = connectDB;
