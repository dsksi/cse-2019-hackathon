import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Country from "./components/Country";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/" exact component={Country} />
  </Switch>;