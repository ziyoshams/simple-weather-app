import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";

let initState = {
  loading: true,
  city: "",
  currently: {
    temperature: 0,
    windSpeed: 0,
    icon: ""
  },
  daily: []
};

const FETCH_WEATHER = "FETCH_WEATHER";
const CHANGE_TEMPERATURE_C = "CHANGE_TEMPERATURE_C";
const CHANGE_TEMPERATURE_F = "FHANGE_TEMPERATURE_F";

const gotData = data => {
  return {
    type: FETCH_WEATHER,
    data
  };
};

const changeTemperature = flag => {
  if (flag) {
    return {
      type: CHANGE_TEMPERATURE_C
    };
  } else {
    return {
      type: CHANGE_TEMPERATURE_F
    };
  }
};

export const toggleTemperature = flag => {
  return dispatch => {
    if (flag) dispatch(changeTemperature(flag));
    else dispatch(changeTemperature(flag));
  };
};

export const getData = positions => {
  return dispatch => {
    axios
      .get(`/api/weather/${positions.lat}/${positions.lon}`)
      .then(data => {
        if (data.status === 200) {
          console.log;
          let { apparentTemperature, windSpeed, icon } = data.data.currently;
          let { daily } = data.data;
          let sanitizedDaily = daily.data.map(elem => {
            return {
              day: new Date(elem.time * 1000).toDateString(),
              icon: elem.icon,
              windSpeed: elem.windSpeed,
              tempHigh: elem.apparentTemperatureHigh,
              tempLow: elem.apparentTemperatureLow
            };
          });
          dispatch(
            gotData({
              currently: {
                temperature: Math.floor(apparentTemperature),
                windSpeed,
                icon
              },
              daily: sanitizedDaily
            })
          );
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return {
        ...state,
        loading: false,
        currently: action.data.currently,
        daily: action.data.daily
      };
      break;

    case CHANGE_TEMPERATURE_C:
      return {
        ...state,
        currently: {
          ...state.currently,
          temperature: Math.floor((state.currently.temperature - 32) * (5 / 9))
        }
      };
      break;

    case CHANGE_TEMPERATURE_F:
      return {
        ...state,
        currently: {
          ...state.currently,
          temperature: Math.ceil(state.currently.temperature * (9 / 5) + 32)
        }
      };
      break;
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
