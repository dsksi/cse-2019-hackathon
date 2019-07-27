import React, { Component } from "react";
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      picture: null,
      tempData: {},
      type: null,
    };
  }

  onDrop = (event) => {
    this.setState({
        picture: URL.createObjectURL(event.target.files[0]),
    });
    
    this.predict();
  }
  


  async predict() {
    const image = document.getElementById('image');

    // Load the model.
    const model = await cocoSsd.load();
    // Classify the image.
    const predictions = await model.detect(image);
    if (predictions.length === 0) {
      this.setState({
        type: 1,
      })
    } else {
      console.log('Predictions: ');
      console.log(predictions);
    }
  }

  render() {
    let width = window.outerWidth * 0.8;
    console.log(window.outerWidth)
    return (
      <div>
        { this.state.type === 1 && <h2>Sorry, we can't recognise.</h2> }
        <h1>Little litters!!!</h1>
        <p>upload image here</p>
        <input type="file" onChange={this.onDrop}/>
        <img id="image" alt="no uploaded images" width={width} src={this.state.picture}/>
      </div>
    );
  }
}
