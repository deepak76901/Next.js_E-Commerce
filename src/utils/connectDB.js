import mongoose from "mongoose";

export async function connectDB() {
  let connected = { isConnected: 0 };

  if (connected.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    connected.isConnected = db.connections[0].readyState;
    console.log("Database connected Succesfully");
  } catch (error) {
    console.log("Something went wrong :", error);
  }
}
