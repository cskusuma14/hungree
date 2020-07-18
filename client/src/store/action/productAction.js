import axios from "axios";
const apiURL = "http://localhost:3001";

export function getProducts() {
  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: apiURL + "/products",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({
          type: "GET_PRODUCTS",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function addDataProduct(dataProduct) {
  return (dispatch, setState) => {
    axios({
      url: apiURL + "/products",
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: dataProduct,
    })
      .then((res) => {
        console.log("a");
        dispatch({ type: "ADD_PRODUCTS", payload: res.data });
      })
      .then((err) => {
        console.log(err);
      });
  };
}

export function deleteProduct(idProduct) {
  return (dispatch, setState) => {
    axios({
      url: `${apiURL}/products/${idProduct}`,
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({ type: "DELETE_PRODUCTS", payload: res.data });
      })
      .then((err) => {
        console.log(err);
      });
  };
}
