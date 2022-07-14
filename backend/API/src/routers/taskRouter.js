import express from "express";
import {
  deleteManyTasks,
  deleteTaskById,
  getSingleTask,
  getTasks,
  insertTask,
  updateTask,
} from "../model/task/TaskModel.js";
const router = express.Router();
// :_id?

router.get("/:_id?", async (req, res, next) => {
  try {
    //query the database and get all the task
    // console.log("params = " + req.params);
    // console.log("query = " + req.query);
    console.log(req.params);
    const { _id } = req.params;
    console.log(_id);
    const result = _id ? await getSingleTask(_id) : await getTasks();
    res.json({
      status: "success", // either success or error
      messsage: "return form get method",
      result,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    // call do query to store dat in the db
    const result = await insertTask(req.body);
    // call db query to store data in the db
    console.log(result);
    result?._id
      ? res.json({
          status: "success", // either success or error
          messsage: "The ne wtask has been added.",
          result,
        })
      : res.json({
          status: "error", // either success or error
          messsage: "Error, Unable to add new task, Please check you code",
          result,
        });
  } catch (error) {
    next(error);
  }
});

// This is for update
router.patch("/", async (req, res, next) => {
  try {
    console.log("yubaraj");
    console.log(req.body);
    const { _id, type } = req.body;
    const result = await updateTask(_id, type);
    console.log(result);
    res.json({
      status: "success", // either success or error
      messsage: "return form patch method",
      result,
    });
  } catch (error) {
    next(error);
  }
});
// :_id is a varialbe name and you can put mutile like :_id/:_id2
router.delete("/:_id/", async (req, res, next) => {
  const { _id } = req.params;
  const result = await deleteTaskById(_id);
  console.log(result);
  try {
    res.json({
      status: "success", // either success or error
      messsage: "return form delete method",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  const ids = req.body;
  const result = await deleteManyTasks(ids);
  console.log(result);
  try {
    res.json({
      status: "success", // either success or error
      messsage: "return form delete method",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
