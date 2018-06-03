import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import axios from "axios";
import logger from "redux-logger";
import geocode from '../../modules/geocode';


let initState = {
  loading: true,
  city: "",
  currently: {
    temperature: 0,
    windSpeed: 0,
    icon: "",
    summary: ""
  },
  daily: [],
  searchPlace: "",
};

const FETCH_WEATHER = "FETCH_WEATHER";
const CHANGE_TEMPERATURE_C = "CHANGE_TEMPERATURE_C";
const CHANGE_TEMPERATURE_F = "FHANGE_TEMPERATURE_F";
const PLACE_TO_SEARCH = "PLACE_TO_SEARCH";
const SET_CITY = "SET_CITY";


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
    flag
      ? dispatch(changeTemperature(flag))
      : dispatch(changeTemperature(flag));
  };
};

export const getData = positions => {
  return dispatch => {
    axios
      .get(`/api/weather/${positions.lat}/${positions.lon}`)
      .then(data => {
        if (data.status === 200) {
          let {
            apparentTemperature,
            windSpeed,
            icon,
            summary
          } = data.data.currently;

          let { daily } = data.data;
          let sanitizedDaily = daily.data.map(elem => {
            return {
              day: new Date(elem.time * 1000)
                .toDateString()
                .split(" ")
                .shift(), // Take only Sat, Sun, Mon ...
              icon: elem.icon,
              windSpeed: elem.windSpeed,
              tempHigh: elem.apparentTemperatureHigh,
              tempLow: elem.apparentTemperatureLow
            };
          });
          sanitizedDaily.pop(); // Remove the last day
          dispatch(
            gotData({
              currently: {
                temperature: Math.floor(apparentTemperature),
                windSpeed,
                icon,
                summary
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

// SEARCH ACTION CREATORS

const gotPlace = (place) => {
  return {
    type: PLACE_TO_SEARCH,
    place
  }
}

const setCity = (city) => {
  return{
    type: SET_CITY,
    city
  }
}

export const findCity = (positions) => {
  return (dispatch) => {
    const result = axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${positions.lat},${positions.lon}`);
    result.then((response) => {
      if(response.data.status === 'OK'){
        const city = response.data.results[0].address_components.filter((elem) => elem.types.includes('sublocality_level_1'));
        console.log(city[0]);
        if(city[0])
          dispatch(setCity(city[0].long_name));
      }
    })
  }
}


export const updatePlaceState = (place) => {
  return (dispatch) => {
    dispatch(gotPlace(place));
  }
}

export const getPlace = (place) => {
  return (dispatch) => {
    const result = geocode(place);
    result.then((response) => {
      if(response.data.status === 'OK'){
        const city = response.data.results[0].formatted_address;
        const {lat, lng} = response.data.results[0].geometry.location;
        dispatch(setCity(city));
        dispatch(getData({lat, lon: lng}));
      }
    })
  }
}

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
        },
        daily: state.daily.map(day => {
          return {
            ...day,
            tempHigh: Math.floor((day.tempHigh - 32) * (5 / 9)),
            tempLow: Math.floor((day.tempLow - 32) * (5 / 9))
          };
        })
      };
      break;

    case CHANGE_TEMPERATURE_F:
      return {
        ...state,
        currently: {
          ...state.currently,
          temperature: Math.ceil(state.currently.temperature * (9 / 5) + 32)
        },
        daily: state.daily.map(day => {
          return {
            ...day,
            tempHigh: Math.ceil(day.tempHigh * (9 / 5) + 32),
            tempLow: Math.ceil(day.tempLow * (9 / 5) + 32)
          };
        })
      };
      break;

    case PLACE_TO_SEARCH:
      return {
        ...state,
        searchPlace: action.place
      }  

    case SET_CITY:
      return {
        ...state,
        city: action.city
      }   
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

export default store;
