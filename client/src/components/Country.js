import React, { Component } from "react";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

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
    const { country, region } = this.state;
    return (
      <div>
        <p>Select Country</p>
        <CountryDropdown
          value={country}
          onChange={(val) => this.selectCountry(val)} />
        <p>Select Region</p>
        <RegionDropdown
          value={country}
          value={region}
          onChange={(val) => this.selectRegion(val)} />
      </div>

    );
  }
}
