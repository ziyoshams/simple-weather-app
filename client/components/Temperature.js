import React, { Component } from "react";

const Temperature = (props) => {
  return (
    <div className="temperature">
      <h1>{props.info.temperature}&#176; </h1>
      <p>
        <span>{props.info.summary} / </span>
        <span>{props.info.windSpeed} mph</span>
      </p>
    </div>
  );
};

export default Temperature;
