import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Country from "./components/Country";
import zoom from "./components/zoom";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/country" exact component={Country} />
    <Route path="/zoom" exact component={zoom} />
  </Switch>;