const mongoose = require('mongoose');

// Disable buffering globally so queries fail fast or fall back gracefully
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.log(`⚠️ Server running with admin fallback mode enabled.`);
  }
};

module.exports = connectDB;
