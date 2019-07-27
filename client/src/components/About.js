import React, { Component } from "react";
import little from "../little.png";
export default class About extends Component {
  render() {
      return (
        <div>
          <img style={{  display: "block",
    margin: "auto" }} alt="logo" src={little} />
          <h1 align="center">Little Litters</h1>
          <p align="center">Version 1.0.0</p>
          <h4 align="center">Recycle for our planet's future.</h4>
          <h4 align="center">Starting little, starting now.</h4>
        </div>
    );
  }
}

