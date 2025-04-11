import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Minor_Project");
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;
