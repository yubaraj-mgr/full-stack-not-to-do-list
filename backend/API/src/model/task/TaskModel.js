// This is a final 3 red stage where we import Schema and insert update and delete data from database.

import TaskSchema from "./TaskScheme.js";

// insert
export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
};
// select
export const getTasks = () => {
  return TaskSchema.find();
};

export const getSingleTask = (_id) => {
  return TaskSchema.findById(_id);
};

// update/Patch
export const updateTask = (_id, type) => {
  // new: true is so that it will show the updated data otherwise it will show old data
  // { type: type } = {type} if both are same
  return TaskSchema.findByIdAndUpdate(_id, { type: type }, { new: true });
};

// delele
// single item by by
export const deleteTaskById = (_id) => {
  return TaskSchema.findByIdAndDelete(_id);
};

// many can be used for both single and mutiple

// delete many items from the array of ids
export const deleteManyTasks = (ids) => {
  return TaskSchema.deleteMany({
    _id: {
      $in: ids,
    },
  });
};
