import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database Connection error", error);
    process.exit(1);
  }
};