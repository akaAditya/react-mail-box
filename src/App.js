// import { Route, Switch, Redirect } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom/cjs/react-router-dom";
import UserRegisteration from "./components/UserRegisteration/UserRegisteration";
import { useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import React from "react";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const isLoggedIn = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home">
            {isLoggedIn && <HomePage />}
            {!isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/auth">
            <UserRegisteration />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
