import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import AddForm from "./components/AddForm";
import ListArea from "./components/ListArea";

const weeklyHour = 7 * 24;

function App() {
  const [taskList, seTaskList] = useState([]);
  const [ids, setIds] = useState([]);

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = (task) => {
    if (total + +task.hr > weeklyHour) {
      return alert(
        "Sorry Sir, you don't have enough time left to fit this task"
      );
    }
    seTaskList([...taskList, task]);
  };

  const switchTask = (id, type) => {
    // console.log(id, type);
    // What does this line of code means
    const switchArg = taskList.map((item, index) => {
      if (item.id === id) {
        item.type = type;
      }
      return item;
    });
    seTaskList(switchArg);
  };

  const handleOnCheck = (e) => {
    const { checked, value, name } = e.target;
    console.log(checked, value, name);
    // if ticked add all ides in ids ohterwise take them out
    if (value == "entry" || value == "bad") {
      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type == value) {
          toDeleteIds.push(item.id);
        }
      });
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
        const tempArgsForId = ids.filter((id) => {
          return !toDeleteIds.includes(id);
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

  const handleOnDelete = () => {
    if (
      !window.confirm("Are you sure, you want to delete the selected items?")
    ) {
      return;
    }

    const tempArgsForDelete = taskList.filter((item) => {
      return !ids.includes(item.id);
    });
    seTaskList(tempArgsForDelete);
    setIds([]);
  };

  return (
    <div className="wrapper">
      <Container>
        <h1 className="text-center py-5">My Not To Do List</h1>
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
