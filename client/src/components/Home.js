import React, { Component } from "react";
import ImageUploader from 'react-images-upload'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
// import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';

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

  componentDidMount() {
    if (window.localStorage.getItem('country')) {
      this.setState({
        country: window.localStorage.getItem('country'),
      });
    }
  }

  handleChange = event => {
    var name = [event.target.id];
    this.setState({
      [name]: event.target.value,
    });
    window.localStorage.setItem('country', event.target.value)
    if (this.state.pictures.length > 0) {
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
  };

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
    const predictions = await model.detect(image[1]);

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
    for (let i = 0; i < this.state.objects.length; i++) {
      let obj = this.state.objects[i];
      axios.get(`https://littlelitter.herokuapp.com/country/${this.state.country}/label/${obj}/`)
      .then(response => {
        console.log(response.data.recycling_method.method);
        this.setState({
          classesStr: this.state.classesStr.concat(response.data.recycling_method.method) + ' ',
          classes: this.state.classes.concat(response.data.recycling_method.method),
        })
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

    render() {
        return (
          <div>
            <div>

            <FormControl>
              <InputLabel shrink htmlFor="age-native-label-placeholder">
              Location
              </InputLabel>
              <NativeSelect
                value={this.state.country}
                onChange={this.handleChange}
                input={<Input name="country" id="country" />}
              >
                <option value={0}>Sydney</option>
                <option value={1}>Shanghai</option>
                <option value={0}>More...</option>
              </NativeSelect>
              <FormHelperText></FormHelperText>
            </FormControl>
            <br/>
            <br/>
            <br/>

            </div>
            <Typography variant="h4" gutterBottom>
              Object: {this.state.objectsStr} 
            </Typography>
            <Typography variant="h4" gutterBottom>
              Classes: {this.state.classesStr}
            </Typography>
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
