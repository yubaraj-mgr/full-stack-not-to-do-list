// This is a second step where we make a table using Schema and export and model.

import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      require: true,
      maxlength: 100,
    },
    hr: {
      type: Number,
      require: true,
      maxlength: 168,
    },
    type: {
      type: String,
      default: "entry",
      require: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);
