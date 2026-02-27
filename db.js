const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // For Mongoose 7+, these options are NOT needed
    await mongoose.connect("mongodb://127.0.0.1:27017/mindmates");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

