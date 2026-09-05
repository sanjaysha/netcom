import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected:", connection.connection.host);
  } catch (error) {
    console.log("Error connection to MongoDB:", error);
    // throw new Error(error.message);
    process.exit(1); // 1 status code means fail, 0 means success.
  }
};
