import React, { Component } from "react";
import * as cocoSsd from '@tensorflow-models/coco-ssd'

export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      picture: null,
      tempData: {},
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

    console.log('Predictions: ');
    console.log(predictions);
  }

  render() {
    return (
      <div>
        <h1>Little litters!!!</h1>
        <p>upload image here</p>
        <input type="file" onChange={this.onDrop}/>
        <img id="image" alt="no uploaded images" src={this.state.picture}/>
      </div>
    );
  }
}
