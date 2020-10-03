import React from "react";
import PropTypes from "prop-types";
import { GET_W_DATA } from "../aTypes";

export const WeatherStateCtx = React.createContext({});
export const WeatherDispatchCtx = React.createContext({});

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_W_DATA:
      return { ...state, [action.Name]: action.data }
    default:
      break;
  }
};

export const WeatherProvider = ({ children }) => {
  const [wInfo, wDispatch] = React.useReducer(reducer, {});
  
  return (
    <WeatherStateCtx.Provider value={wInfo}>
      <WeatherDispatchCtx.Provider value={wDispatch}>
        {children}
      </WeatherDispatchCtx.Provider>
    </WeatherStateCtx.Provider>
  );
};

WeatherProvider.propTypes = {
  children: PropTypes.object
};
