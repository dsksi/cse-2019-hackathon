import React, { Component } from "react";
import ImageUploader from 'react-images-upload'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import axios from 'axios';

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { 
  //     picture: null,
  //     tempData: {},
  //     type: null,
  //     disabledButton: "block"
  //   };
  // }

  // onDrop = (event) => {

  //   this.setState({
  //       picture: URL.createObjectURL(event.target.files[0]),
  //       disabledButton: "none",
  //   });
    
  //   this.predict();
  // }

  // async predict() {
  //   const image = document.getElementById('image');

  //   // Load the model.
  //   const model = await cocoSsd.load();
  //   // Classify the image.
  //   const predictions = await model.detect(image);
  //   if (predictions.length === 0) {
  //     this.setState({
  //       type: 1,
  //     })
  //   } else {
  //     console.log('Predictions: ');
  //     console.log(predictions);
  //   }

  //   this.setState({
  //     disabledButton: "block",
  //   })
  // }

  // render() {
  //   let width = window.outerWidth * 0.8;
  //   // console.log(window.outerWidth)
  //   return (
  //     <div>
  //       { this.state.type === 1 && <h2>Sorry, we can't recognise.</h2> }
  //       <h1>Little litters!!!</h1>
  //       <p>upload image here</p>
  //       <input style={{ display: this.state.disabledButton }} type="file" onChange={this.onDrop}/>
  //       <img id="image" alt="no uploaded images" width={width} src={this.state.picture}/>
  //     </div>
  //   );
  // }

  constructor(props) {
		super(props);
		 this.state = { pictures: [] };
		 this.onDrop = this.onDrop.bind(this);
	}

	onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
        // console.log(this.state.pictureDataURLs);
        this.predict();
    }
      
    async predict() {
      const image = document.getElementsByTagName('img');
      console.log(image)
      // Load the model.
      const model = await cocoSsd.load();
      // Classify the image.
      const predictions = await model.detect(image[1]);
      if (predictions.length === 0) {
        this.setState({
          type: 1,
        })
      } else {
        console.log('Predictions: ');
        console.log(predictions);
      }
  
      this.setState({
        disabledButton: "block",
      })
    }

    render() {
        return (
            <ImageUploader
                	withIcon={true}
                	buttonText='Choose images'
                	onChange={this.onDrop}
                	imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
            />
        );
    }
}
