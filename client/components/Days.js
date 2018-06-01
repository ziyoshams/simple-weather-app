import React, { Component } from "react";

const Days = () => {
  return (
    <div className="days">
      {[1,2,3,4,5,6,7].map((el) => <Day key={el}/>)}
    </div>
  );
};

const Day = () => {
  return (
    <div className="days-of-week">
      <span className="day">Mon</span>
      <span className="icon">i</span>
      <span className="future-temperature">76</span>
    </div>
  );
};

export default Days;