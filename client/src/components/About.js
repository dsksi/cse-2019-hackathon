import React, { Component } from "react";
import little from "../little.png";
import { Typography } from "@material-ui/core";

export default class About extends Component {
  render() {
      return (
        <div>
          <img style={{  
            width: "80%" ,
            display: "block",
            margin: "auto" 
          }} alt="logo" src={little} />
          <Typography variant="h6" align="center" gutterBottom>Version 1.0.0</Typography>
          <Typography variant="h6" align="center" gutterBottom>Recycle for our planet's future.</Typography>
          <Typography variant="h6" align="center" gutterBottom>Starting little, starting now.</Typography>
          <br/>
          <br/>
          <br/>
          <Typography color="textSecondary" variant="body2" align="center" gutterBottom>Gary Liu, Amy Zhou, Henry Bian, Yutong Ji, Qiwei Yang, Yuqi Ji</Typography>
        </div>
    );
  }
}

