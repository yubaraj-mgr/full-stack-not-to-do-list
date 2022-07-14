// This is a first step where we connect our database to the server.

import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    // const MONGO_CLIENT = mongoose.connect(process.env.MONGO_CLIENT);
    const conn = mongoose.connect(process.env.MONGO_CLIENT);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
