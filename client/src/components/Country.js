import React, { Component } from "react";
//import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles({
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });
// export default function MediaCard() {
//   const classes = useStyles();
//   return (

//   );
// }

export default class Country extends Component {
  constructor(props) {
    super(props);
     this.state = { country: '', region: '' };
  }

  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ region: val });
  }
  render() {
    return (
      <div>
        <Card>
        <CardActionArea>
          <CardMedia
            image="https://www.google.com/imgres?imgurl=https%3A%2F%2Flonelyplanetimages.imgix.net%2Fmastheads%2F65830387.jpg%3Fsharp%3D10%26vib%3D20%26w%3D1200&imgrefurl=https%3A%2F%2Fwww.lonelyplanet.com%2Faustralia%2Fsydney&docid=S2RpbbeSaC38tM&tbnid=zU4MFWm42cZwJM%3A&vet=10ahUKEwjk7t6qvtXjAhVPfH0KHRi3BSUQMwhDKAEwAQ..i&w=1200&h=800&bih=802&biw=1368&q=sydney&ved=0ahUKEwjk7t6qvtXjAhVPfH0KHRi3BSUQMwhDKAEwAQ&iact=mrc&uact=8"
            title="Sydney"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Sydney
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Recylable, organic, waste
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Set
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
        </Card>
        <br></br>
        <Card>
      <CardActionArea>
        <CardMedia
          title="Shanghai"
          image=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Shanghai
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Wet waste, Dry waste, Recylable, Hazardous
          </Typography>
        </CardContent>
      </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Set
      </Button>
      <Button size="small" color="primary">
        Learn More
      </Button>
    </CardActions>
    </Card>
      </div>

    );
  }
}
