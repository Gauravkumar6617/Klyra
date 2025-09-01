// config/db.js
import mongoose from "mongoose";

const Connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Error during DB connection:", error);
    process.exit(1);
  }
};

export default Connection;
