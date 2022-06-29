import React from "react";
import { Row, Col } from "react-bootstrap";
import TaskList from "./TaskList";

const ListArea = ({ taskList, switchTask, total, handleOnCheck, ids }) => {
  // + is to change it to number
  // { type } is a destructure

  const entryList = taskList.filter(({ type }) => type === "entry");

  const badList = taskList.filter(({ type }) => type === "bad");

  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);
  return (
    <div className="list-area">
      <Row>
        <Col>
          <TaskList
            title="Entry List"
            arrow="right"
            entryList={entryList}
            switchTask={switchTask}
            handleOnCheck={handleOnCheck}
            name="entry"
            ids={ids}
          />
          <div className="fw-bold text-success mt-5">
            Total Time Allocated is {total} hr/wk
          </div>
        </Col>

        <Col>
          {/* entryList={badList} don't get confused here */}
          <TaskList
            title="Bad Task List"
            entryList={badList}
            switchTask={switchTask}
            handleOnCheck={handleOnCheck}
            name="bad"
            ids={ids}
          />
          <div className="text-end text-danger fw-bold mt-5">
            You could have save {badHrs} hr
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ListArea;
