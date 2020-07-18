import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addDataCategory } from "../store/action/categoryAction";
import swal from "sweetalert";

export default () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      name,
      description,
    };
    dispatch(addDataCategory(data));
    // swal("Good Job!", "Success add Category", "success");
    history.push("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupCategoryName">
          <Form.Label>Category Name </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Category Name"
            required
          />

          <Form.Group controlId="formGroupCategoryDescription">
            <Form.Label> Description </Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Category Description"
              required
            />
          </Form.Group>
        </Form.Group>
        <Button variant="dark" type="submit">
          Add New Category
        </Button>
      </Form>
    </Container>
  );
};
