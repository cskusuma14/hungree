import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProductById, editProduct } from "../store/action/productAction";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

export default () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image_url, setImageUrl] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  let { id } = useParams();
  const { product } = useSelector((state) => state.productsReducer);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {};
    name == "" ? (data.name = product.name) : (data.name = name);
    price == "" ? (data.price = product.price) : (data.price = price);
    stock == "" ? (data.stock = product.stock) : (data.stock = stock);
    description == ""
      ? (data.description = product.description)
      : (data.description = description);
    category == ""
      ? (data.category = product.category)
      : (data.category = category);
    image_url == ""
      ? (data.image_url = product.image_url)
      : (data.image_url = image_url);

    // console.log(data);
    dispatch(editProduct(id, data));
    history.push("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupProductName">
          <Form.Label>Product Name </Form.Label>
          <Form.Control
            type="text"
            defaultValue={product.name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
            required
          />
          <Form.Group controlId="formGroupProductPrice">
            <Form.Label>Price </Form.Label>
            <Form.Control
              type="number"
              defaultValue={product.price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Product Price"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGroupProductStock">
            <Form.Label>Stock </Form.Label>
            <Form.Control
              type="number"
              defaultValue={product.stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Enter Product Stock"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGroupProductCategory">
            <Form.Label> Category </Form.Label>
            <Form.Control
              type="text"
              defaultValue={product.category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Product Category"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGroupProductDescription">
            <Form.Label> Description </Form.Label>
            <Form.Control
              type="text"
              defaultValue={product.description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Product Description"
              required
            />
          </Form.Group>
          <Form.Group controlId="formGroupProductImage">
            <Form.Label>Image URL </Form.Label>
            <Form.Control
              type="text"
              defaultValue={product.image_url}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter Product Image url"
              required
            />
          </Form.Group>
        </Form.Group>
        <Button variant="dark" type="submit">
          Edit Product
        </Button>
      </Form>
    </Container>
  );
};
