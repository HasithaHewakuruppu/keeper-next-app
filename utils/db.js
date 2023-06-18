// utils/db.js

import mongoose from "mongoose";

const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/nextKeeperAppDB', {
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

