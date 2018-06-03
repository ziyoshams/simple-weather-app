import React, { Component } from "react";

const Days = (props) => {
  return (
    <div className="days">
      {props.info.map((el) => <Day info={el} key={el.day}/>)}
    </div>
  );
};

const Day = (props) => {
  const { day, icon, windSpeed, tempHigh, tempLow } = props.info;
  const today = new Date().toDateString().split(' ').shift();
  return (
    <div className="days-of-week animated slideInUp">
      <span className="day">{day}</span>
      <span className="icon"><img src={`/images/icons/${icon}.svg`} alt={icon}/></span>
      <span className="future-temperature">{Math.ceil(tempHigh)}</span>
    </div>
  );
};

export default Days;