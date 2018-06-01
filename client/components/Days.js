import React, { Component } from "react";

const Days = (props) => {
  console.log(props.info);
  return (
    <div className="days">
      {props.info.map((el) => <Day info={el} key={el.day}/>)}
    </div>
  );
};

const Day = (props) => {
  const { day, icon, windSpeed, tempHigh, tempLow } = props.info;
  const today = day.split(' ').shift();
  console.log(today);
  return (
    <div className="days-of-week">
      <span className="day">{today}</span>
      <span className="icon"><img src={`/images/icons/${icon}.svg`} alt={icon}/></span>
      <span className="future-temperature">{Math.ceil(tempHigh)}</span>
    </div>
  );
};

export default Days;