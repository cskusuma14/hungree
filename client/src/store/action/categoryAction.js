import axios from "axios";
const apiURL = "http://localhost:3001";

export function getCategory() {
  return (dispatch, getState) => {
    axios({
      method: "GET",
      url: apiURL + "/categories",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({
          type: "GET_CATEGORIES",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function addDataCategory(dataCategory) {
  return (dispatch, setState) => {
    axios({
      url: apiURL + "/categories",
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      data: dataCategory,
    })
      .then((res) => {
        console.log("a");
        dispatch({ type: "ADD_CATEGORIES", payload: res.data });
      })
      .then((err) => {
        console.log(err);
      });
  };
}

export function deleteCategory(idCategory) {
  return (dispatch, setState) => {
    axios({
      url: `${apiURL}/categories/${idCategory}`,
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        dispatch({ type: "DELETE_CATEGORIES", payload: res.data });
      })
      .then((err) => {
        console.log(err);
      });
  };
}
