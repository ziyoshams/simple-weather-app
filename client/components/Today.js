import React, { Component } from "react";
import { connect } from "react-redux";

class Today extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="today">
        <p>{new Date().toDateString()}</p>
        <h1>
          <span>
          <i className="fas fa-map-marker"></i>
          </span>
          <span> {this.props.city}</span>
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    city: state.city
  };
};

export default connect(mapStateToProps)(Today);
