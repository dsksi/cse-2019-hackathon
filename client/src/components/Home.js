import React, { Component } from "react";
import ImageUploader from 'react-images-upload'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
		super(props);
		 this.state = { 
       pictures: [],
       objects: [], // the object
       objectsStr: "", // the object
       classes: [], // classes
       classesStr: "", // classes
       displayButton: "block",
       country: 0,
       id: 0,
      };
     this.onDrop = this.onDrop.bind(this);
	}

	onDrop(pictureFiles, pictureDataURLs) {
		this.setState({
        pictures: this.state.pictures.concat(pictureFiles),
    });
    // console.log(this.state.pictureDataURLs);
    if (pictureFiles.length >= 1) {
      this.setState({
        displayButton: "none",
      });
    } else {
      this.setState({
        displayButton: "block",
      });
    }
    if (pictureFiles.length > 0) {
      this.setState({
        objectsStr: "",
        objects: [],
      })
      this.setState({
        classesStr: "",
        classes: [],
      })
      this.predict();
    }

  }
      
  async predict() {
    const image = document.getElementsByTagName('img');
    console.log(image)
    // Load the model.
    const model = await cocoSsd.load();
    // Classify the image.
    const predictions = await model.detect(image[1]); //

    if (predictions.length === 0) {
      this.setState({
        type: 1,
      })
    } else {
      // add to objects
      predictions.forEach(p => {
        this.setState({
          objectsStr: this.state.objectsStr.concat(p.class) + ' ',
          objects: this.state.objects.concat(p.class),
        })
      });
      console.log('Predictions: ');
      console.log(this.state.objectsStr);
      console.log(predictions);
    }

    // get class
    for (let i = 0; i< this.state.objects.length; i++) {
      let obj = this.state.objects[i];
      axios.get(`https://littlelitter.herokuapp.com/country/${this.state.country}/label/${obj}/`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

    render() {
        return (
          <div>
            <h1>Object: {this.state.objectsStr} </h1>
            <h1>Classes: {this.state.classesStr} </h1>
            <ImageUploader
                	withIcon={true}
                	buttonText='Choose images'
                	onChange={this.onDrop}
                	imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
                  buttonStyles={{ display: this.state.displayButton }}
            />
          </div>
        );
    }
}
