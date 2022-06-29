import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// sir was confuse to make unque id
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const initialState = {
  task: "",
  hr: "",
  type: "entry",
};
const AddForm = ({ addTask }) => {
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    //   name is the name of the input field and the value is the value of typed input value
    const { name, value } = e.target;
    // [name] is so that we can use it as a varaible not the propertyr of the object, so we can change the value, make it dynamic not static
    setForm({ ...initialState, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // give uniqure id to the object property
    addTask({ ...form, id: uuidv4() });
  };
  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="g-2">
          <Col md="7">
            <Form.Control
              name="task"
              placeholder="Task Name"
              required
              onChange={handleOnChange}
            />
          </Col>
          <Col md="3">
            <Form.Control
              name="hr"
              placeholder="10"
              type="number"
              required
              onChange={handleOnChange}
            />
          </Col>
          <Col md="2">
            <Button variant="success" type="submit">
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddForm;
