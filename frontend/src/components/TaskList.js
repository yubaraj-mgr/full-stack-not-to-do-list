import React from "react";
import Table from "react-bootstrap/Table";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
{
  /* annonouses function so that we want to pass the data not call the function */
  // What is the meaning of entryList =[]
  // [] is there for default value on entryList array because when first rendering we don't have any value and entryList needs either "entry" or "bad".
}
const TaskList = ({
  title,
  arrow,
  entryList = [],
  switchTask,
  handleOnCheck,
  name,
  ids,
}) => {
  return (
    <div className="mt-3 task-table">
      <h2 className="text-center">{title}</h2>
      <div className="table mt-3">
        <Table striped>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  value={name}
                  onChange={handleOnCheck}
                />
              </th>
              <th>Task</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entryList.map((item, i) => {
              return (
                <tr>
                  <td>
                    <Form.Check
                      type="checkbox"
                      value={item._id}
                      checked={ids.includes(item._id)}
                      onChange={handleOnCheck}
                    />
                  </td>
                  <td>{item.task}</td>
                  <td>{item.hr} hr</td>
                  <td>
                    {arrow === "right" ? (
                      <Button
                        variant="success"
                        onClick={() => switchTask(item._id, "bad")}
                      >
                        <i class="fa-solid fa-arrow-right"></i>
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => switchTask(item._id, "entry")}
                      >
                        <i class="fa-solid fa-arrow-left"></i>
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TaskList;
