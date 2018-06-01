import React, { Component } from "react";

const Temperature = (props) => {
  console.log(props.info)
  return (
    <div className="temperature">
      <h1>{props.info.temperature}&#176; </h1>
      <p>
        <span>{props.info.icon} /</span>
        <span>{props.info.windSpeed} mph</span>
      </p>
    </div>
  );
};

export default Temperature;
