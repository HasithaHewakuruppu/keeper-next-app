import mongoose from "mongoose";

const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}

export default connectDB;
