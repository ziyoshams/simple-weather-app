import React, { Component } from "react";
import { connect } from "react-redux";
import { getPlace, updatePlaceState } from "../redux/store";

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
  }

  handleLocationSearch(evt) {
    evt.preventDefault();
    this.props.search(this.props.place);
  }

  handleChange(evt) {
    this.props.update(evt.target.value);
  }

  render() {
    return (
      <form id="search-input" className="input-field" onSubmit={this.handleLocationSearch}>
        <input type="text" name="place" value={this.props.place} onChange={this.handleChange} />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    place: state.searchPlace
  };
};

const mapDispatchToProps = dispatch => {
  return {
    search: place => dispatch(getPlace(place)),
    update: value => dispatch(updatePlaceState(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
