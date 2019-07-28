import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

// import './volunteer.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    width: 'auto',
    height: 'auto',
    maxWidth: 350,
    minWidth: 185,
    maxHeight: 260,
    [theme.breakpoints.up(1279)]: {
      minHeight: 260,
      width: 'auto',
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down(1077) && theme.breakpoints.up('sm')]: {
      minHeight: 260,
      width: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.down('sm') && theme.breakpoints.up(1350)]: {
      width: 'auto',
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  media: {
    height: 120,
  },
  action: {
    minHeight: 20,
  },
});

class Volunteer extends Component {
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

  async componentDidMount() {
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

  updateImage = () =>{
    axios.get(`https://littlelitter.herokuapp.com/country/${this.state.country}/volunteer/`)
    .then(res => {
      const link = res.data.volunteer;
      this.setState({ 
        image: link
      });
      // console.log(link)
    })
  }

  getButtons() {
    return [{}].concat(this.state.labels).map(label => 
      <Button size="small" color="primary" value={label} key={label} onClick={this.updateImage}/>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image={this.state.image.image_link}
          />
          <CardContent>
            Please choose one
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.action}>
          {this.getButtons}
          {/* <Button size="small" className="input-button" value="Next" type="button" key="Next" onClick={updateImage}/> */}
        </CardActions>
      </Card>
    );
    }
}

Volunteer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Volunteer);