import React, { Component } from "react";
import ImageUploader from 'react-images-upload';

export default class Home extends Component {
  constructor(props) {
    super(props);
     this.state = { pictures: [] };
     this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
}
  render() {
    return (
      <div>
        <h1>Little litters!!!</h1>
        <p>upload image here</p>
        <ImageUploader
            withIcon={true}
            withPreview={true}
            buttonText='Choose images'
            onChange={this.onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />
      </div>

    );
  }
}
