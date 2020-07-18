import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { getProducts, deleteProduct } from "../store/action/productAction";
import { getCategory, deleteCategory } from "../store/action/categoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products } = useSelector((state) => state.productsReducer);
  const { categories } = useSelector((state) => state.categoriesReducer);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory());
  }, [dispatch]);

  const deleteProductById = (id) => {
    // dispatch(addNewTeam(hero));
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteProduct(id));
      }
    });
  };

  const deleteCategoryById = (id) => {
    // dispatch(addNewTeam(hero));
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteCategory(id));
      }
    });
  };

  return (
    <Container>
      <h1>Products</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Description</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{(index += 1)}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>{product.description}</td>
              <td>
                <Button
                  variant="dark"
                  onClick={() => history.push(`/product/${product.id}`)}
                >
                  Edit
                </Button>
                | |
                <Button
                  variant="dark"
                  onClick={() => deleteProductById(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h1>Categories</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{(index += 1)}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Button
                  variant="dark"
                  onClick={() => history.push(`/categories/${category.id}`)}
                >
                  Edit
                </Button>
                | |
                <Button
                  variant="dark"
                  onClick={() => deleteCategoryById(category.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
