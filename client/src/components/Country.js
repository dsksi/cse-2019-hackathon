import React, { Component } from "react";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default class Country extends Component {
  constructor(props) {
    super(props);
     this.state = { country: 0, region: '' };
  }

  selectCountry (val) {
    this.setState({ country: val });
    window.localStorage.setItem('country', val);
  }

  selectRegion (val) {
    this.setState({ region: val });
  }
  componentDidMount() {
    if (window.localStorage.getItem('country')) {
      this.setState({
        country: window.localStorage.getItem('country'),
      })
    }
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
          country={country}
          value={region}
          onChange={(val) => this.selectRegion(val)} />
      </div>

    );
  }
}
