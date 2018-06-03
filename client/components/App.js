import React, { Component } from "react";
import { connect } from "react-redux";
import Days from "./Days";
import Temperature from "./Temperature";
import Today from "./Today";
import SwitchToggle from "./SwitchToggle";
import Search from "./Search";
import { getData, toggleTemperature, findCity } from "../redux/store";
import geocode from '../../modules/geocode';

class App extends Component {
  constructor() {
    super();

    this.handlePosition = this.handlePosition.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handlePosition,
      this.handleLocationSearch
    );
  }

  handlePosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    this.props.updatePositions({ lat, lon });
    this.props.findCity({ lat, lon });
  }

  handleSwitch(evt) {
    if (evt.target.checked) {
      this.props.toggleTemperature(true);
    } else {
      this.props.toggleTemperature(false);
    }
  }

  handleLocationSearch() {
    const search = document.getElementById('search-input');
    search.classList.add('visible');
  }

  render() {
    return (
      <div className="container">
        <div className="main">
          <img
            id="image"
            src="https://images.unsplash.com/photo-1489517456831-3994100a43bd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a31684ae035e64a810b9ec10ff9f6b8a&w=1000&q=80"
            alt=""
          />
          <div className="info">
            <Temperature info={this.props.currently} />
            <Today info={this.props.currently} />
            <SwitchToggle toggle={this.handleSwitch} />
          </div>

          <Search />
        </div>
        <Days info={this.props.daily} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.city,
    loading: state.loading,
    currently: state.currently,
    daily: state.daily
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePositions: data => dispatch(getData(data)),
    toggleTemperature: flag => dispatch(toggleTemperature(flag)),
    findCity: (positions) => dispatch(findCity(positions))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
