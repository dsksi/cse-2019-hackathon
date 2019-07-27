import React, { Component } from "react";
import axios from 'axios';

export default class Home extends Component {
  state = {
    images: [],
    // country: 
  }
  componentDidMount() {
    axios.get(`http://google.com`)
      .then(res => {
        const images = res.data;
        this.setState({ images });
    })
  }
  render() {
    return (
      <div>

      </div>

    );
  }
}
