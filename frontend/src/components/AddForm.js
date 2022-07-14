import { Button } from "react-bootstrap";
import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
// sir was confuse to make unque id
// import { v4 as uuidv4 } from "uuid";
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

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
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // give uniqure id to the object property
    console.log(form);
    addTask(form);
  };
  return (
    <div>
      <Form className="mt-5 text-center" onSubmit={handleOnSubmit}>
        <Row className="g-2">
          <Col md="7">
            <Form.Control
              name="task"
              onChange={handleOnChange}
              required
              placeholder="First name"
            />
          </Col>
          <Col md="3">
            <Form.Control
              name="hr"
              onChange={handleOnChange}
              type="number"
              required
              placeholder="Hours"
            />
          </Col>
          <Col md="2" className="d-flex justify-content-start">
            <Button type="submit" variant="primary">
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddForm;
