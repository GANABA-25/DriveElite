import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let isConnected = false;

const connectionToDataBase = async () => {
  try {
    if (isConnected) {
      console.log("Using existing DB connection");
      return;
    }

    await mongoose.connect(MONGODB_URI);

    isConnected = true;

    console.log("Connected to DB");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};

export default connectionToDataBase;
