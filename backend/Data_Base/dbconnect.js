import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err)
    }
}

export default connectDB;