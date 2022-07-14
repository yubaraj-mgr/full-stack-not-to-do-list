import "dotenv/config";
import express, { Router } from "express";
// helmet is for protection
import helmet from "helmet";
// enable cors by as a middleware
import cors from "cors";
import path from "path/posix";

const app = express();
app.use(helmet());
app.use(cors());
const PORT = process.env.PORT || 8000;

// to get data as post method
app.use(express.json());

// db connect
import { dbConnect } from "./src/config/dbConfig.js";
dbConnect();

import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/task", taskRouter);

// static content serve
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));

app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/backend/build/index.html"));
});

app.use((error, req, res, next) => {
  const status = error.status || 500; //if error.status is truely value than status = error.status else status = 500
  console.log(error, "error");
  res.status(status).json({
    status: "error",
    message: error.message,
  });
  // writing file system to log error
});

app.listen(PORT, (error) => {
  error && console.log(error);
});
