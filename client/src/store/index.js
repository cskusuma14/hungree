import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import productsReducer from "./reducer/product";
import categoriesReducer from "./reducer/category";

const reducer = combineReducers({
  productsReducer,
  categoriesReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
