import React, { Component } from "react";

const Today = () => {
  return (
    <div className="today">
      <p>{new Date().toDateString()}</p>
      <h1>
        <span>
          <i className="material-icons">location_on</i>
        </span>
        <span>New York</span>
      </h1>
    </div>
  );
};

export default Today;
