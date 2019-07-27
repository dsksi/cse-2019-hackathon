import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import './volunteer.css';
import axios from 'axios';


export default class Volunteer extends Component {
  state = {
    image:"",
    labels:[],
    country: 0,
  }
  componentWillMount() {
    if (window.localStorage.getItem('country')) {
      this.setState({
        country: window.localStorage.getItem('country'),
      })
    }
  }
  componentDidMount() {
    axios.get(`https://littlelitter.herokuapp.com/country/${this.state.country}/volunteer/`)
      .then(res => {
        const link = res.data.volunteer;
        this.setState({ 
          image: link
        });
        console.log(link)
    })
    axios.get(`https://littlelitter.herokuapp.com/country/${this.state.country}/`)
      .then(res => {
        res.data.methods.forEach(method => {
          this.setState({
            labels: this.state.labels.concat(method.method)
          })
        })
        console.log(this.state.labels)
      })
  }
  render() {
    const updateImage = () =>{
      axios.get(`https://littlelitter.herokuapp.com/country/${this.state.country}/volunteer/`)
      .then(res => {
        const link = res.data.volunteer;
        this.setState({ 
          image: link
        });
        // console.log(link)
    })
    }

    return (
      <Card>
      <CardActionArea>
        <img
          alt="No images to be recognized"
          src={this.state.image.image_link}
          className="imageSize"
        />
        <CardContent>
        </CardContent>
      </CardActionArea>
      <CardActions className="container">
        {this.state.labels.map(label => {
          return (
            <input size="small" className="input-button" value={label} type="button" key={label} onClick={updateImage}/>
          )})}
        <input size="small" className="input-button" value="Next" type="button" key="Next" onClick={updateImage}/>
      </CardActions>
    </Card>
    );
  }
}