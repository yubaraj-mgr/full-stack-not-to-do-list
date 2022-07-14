// first step.

import axios from "axios";

const apiEp = "/api/v1/task/";

export const fetchTasks = async () => {
  try {
    const { data } = await axios.get(apiEp);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const postTask = async (obj) => {
  try {
    const { data } = await axios.post(apiEp, obj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const swtichServerTask = async (obj) => {
  try {
    const { data } = await axios.patch(apiEp, obj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTask = async (ids) => {
  try {
    const { data } = await axios.delete(apiEp, { data: ids });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
