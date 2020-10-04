import React from 'react';
import PropTypes from 'prop-types';

import { GET_W_DATA, LOAD_CACHED_WEATHER } from '../aTypes';
import { WA_WEATHER_DATA } from '../../../utils/storeKeys';

export const WeatherStateCtx = React.createContext({});
export const WeatherDispatchCtx = React.createContext({});

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CACHED_WEATHER: {
      const cached = JSON.parse(localStorage.getItem(WA_WEATHER_DATA));
      return { ...state, ...cached };
    }
    case GET_W_DATA: {
      const updatedState = { ...state, [action.Name]: action.data };
      localStorage.setItem(WA_WEATHER_DATA, JSON.stringify(updatedState));
      return updatedState;
    }
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
  children: PropTypes.object,
};
