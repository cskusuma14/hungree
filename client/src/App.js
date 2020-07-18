import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Home,
  Login,
  AddProduct,
  EditProduct,
  AddCategory,
  EditCategory,
} from "./pages";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/addProduct">Add Product</Link>
                </li>
                <li>
                  <Link to="/addCategory">Add Category</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/addProduct">
                <AddProduct />
              </Route>
              <Route path="/addCategory">
                <AddCategory />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/product/:id">
                <EditProduct />
              </Route>
              <Route path="/categories/:id">
                <EditCategory />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
