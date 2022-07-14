import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import AddForm from "./components/AddForm";
import ListArea from "./components/ListArea";
import {
  fetchTasks,
  postTask,
  swtichServerTask,
  deleteTask,
} from "./helper/axiosHelper";

const weeklyHour = 7 * 24;

function App() {
  const [taskList, seTaskList] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    getTaskFromServer();
  }, []);

  const getTaskFromServer = async () => {
    const data = await fetchTasks();
    console.log(data);
    // if data.status === "success" than do setTaskList(data.result)
    data.status === "success" && seTaskList(data.result);
  };

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = async (task) => {
    if (total + +task.hr > weeklyHour) {
      return alert(
        "Sorry Sir, you don't have enough time left to fit this task"
      );
    }
    // send data to the server
    console.log(task);
    // seTaskList([...taskList, task]);
    // to store in the sever
    const result = await postTask(task);
    result.status === "success" && getTaskFromServer();
  };

  const switchTask = async (_id, type) => {
    // console.log(id, type);
    // What does this line of code means
    // const switchArg = taskList.map((item, index) => {
    //   if (item._id === id) {
    //     item.type = type;
    //   }
    //   return item;
    // });
    // seTaskList(switchArg);
    const data = await swtichServerTask({ _id, type });
    data.status === "success" && getTaskFromServer();
  };

  const handleOnCheck = (e) => {
    const { checked, value } = e.target;
    // console.log(checked, value, name);
    // if ticked add all ides in ids ohterwise take them out
    if (value == "entry" || value == "bad") {
      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type == value) {
          toDeleteIds.push(item._id);
        }
      });
      console.log(toDeleteIds);
      if (checked) {
        // add all entry list ids,
        // you cannot use map map throws undefined if size differ and filter thors all the object value not just one value.
        // const entryids = taskList.filter((item) => {
        //   if (item.type == "entry") {
        //     return item.id;
        //   }
        // });

        setIds([...ids, ...toDeleteIds]);
        // console.log(entryids);
      } else {
        // remove all entry list ids
        // when you need to delete small array from big array, bigArray.filter(item), !smallArray.includes(eachBigItem);
        const tempArgsForId = ids.filter((_id) => {
          return !toDeleteIds.includes(_id);
        });
        setIds(tempArgsForId);
      }
      return;
    }
    if (checked) {
      // add individual item id
      setIds([...ids, value]);
    } else {
      // remove individual item id
      const filteredArray = ids.filter((id) => id != value);
      setIds(filteredArray);
    }
  };

  const handleOnDelete = async () => {
    if (
      !window.confirm("Are you sure, you want to delete the selected items?")
    ) {
      return;
    }

    // const tempArgsForDelete = taskList.filter((item) => {
    //   return !ids.includes(item._id);
    // });
    console.log(ids);
    const data = await deleteTask(ids);
    if (data.status === "success") {
      getTaskFromServer();
      setIds([]);
    }

    // seTaskList(tempArgsForDelete);
    // setIds([]);
  };

  return (
    <div className="wrapper">
      <Container>
        <h1 className="text-center py-4">My Not To Do List</h1>
        <AddForm addTask={addTask} />
        <hr />
        <ListArea
          taskList={taskList}
          switchTask={switchTask}
          total={total}
          handleOnCheck={handleOnCheck}
          ids={ids}
        />
        <div className="mt-2"></div>
        {/* What is this syntax */}
        {ids.length > 0 && (
          <Button variant="danger" onClick={handleOnDelete}>
            Delete selected Tasks
          </Button>
        )}
      </Container>
    </div>
  );
}

export default App;
