import React, { Component } from "react";
// import ImageUploader from 'react-images-upload';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      file: null
    }
  }  
  handleChange=(event)=> {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
  }  
  render() {
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>

        <img src={this.state.file}/>
        
      </div>
    );
  }
}

