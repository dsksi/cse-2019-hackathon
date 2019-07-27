import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Country from "./components/Country";
import About from "./components/About";

// import AppliedRoute from "./components/AppliedRoute";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/country" exact component={Country} />
    <Route path="/about" exact component={About} />
  </Switch>;