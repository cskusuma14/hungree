import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addDataProduct } from "../store/action/productAction";
import { getCategory } from "../store/action/categoryAction";
import swal from "sweetalert";

export default () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image_url, setImageUrl] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { categories } = useSelector((state) => state.categoriesReducer);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      name,
      price,
      stock,
      description,
      category,
      image_url,
    };
    console.log(data);
    if (data.category == "") swal("please select a category");
    else {
      dispatch(addDataProduct(data));
      // swal("Good Job!", "Success add product", "success");
      history.push("/");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupProductName">
          <Form.Label>Product Name </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
            required
          />
          <Form.Group controlId="formGroupProductPrice">
            <Form.Label>Price </Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Product Price"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGroupProductStock">
            <Form.Label>Stock </Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter Product Stock"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGridState">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose category..</option>
              {categories.map((category) => (
                <option value={category.name} key={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* <Form.Group controlId="formGroupProductCategory">
            <Form.Label> Category </Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Product Category"
              required
            />
          </Form.Group> */}
          <Form.Group controlId="formGroupProductDescription">
            <Form.Label> Description </Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Product Description"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGroupProductImage">
            <Form.Label>Image URL </Form.Label>
            <Form.Control
              type="text"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter Product Image url"
              required
            />
          </Form.Group>
        </Form.Group>
        <Button variant="dark" type="submit">
          Add New Product
        </Button>
      </Form>
    </Container>
  );
};
