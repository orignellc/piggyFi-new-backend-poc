import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("DATA BASE CONNECTION SUCCESSFUL");
  } catch (error) {
    console.log("DB CONNECTION FAILED", error);
    process.exit(1);
  }
}
