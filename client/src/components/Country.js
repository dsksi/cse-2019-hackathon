import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export default function Country() {

    const classes = useStyles();

    return (
      <div>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="sydney"
            height="140"
            image="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
            title="Sydney"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Sydney
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Garbage types: Recyclable, Organics, Waste
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      <br/>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="sh"
            height="140"
            image="https://images.unsplash.com/photo-1533624952480-ad0f18858908?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
            title="shanghai"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Shanghai
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Garbage types: Wet Garbage, Dry Garbage, Recyclable Waste, Hazardous Waste
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
      </div>
    );
}
