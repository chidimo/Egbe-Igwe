import React from 'react';
import PropTypes from 'prop-types';

import { DELIST_CITY, GET_CITIES, GET_CITY } from '../aTypes';
import { WA_CITIES } from '../../../utils/storeKeys';

export const CitiesStateCtx = React.createContext({});
export const CitiesDispatchCtx = React.createContext({});

export const initState = {
  cities: [],
  currentCity: { Population: 1 },
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CITIES: {
      const updated = { ...state, cities: action.cities };
      localStorage.setItem(WA_CITIES, JSON.stringify(updated));
      return updated;
    }
    case DELIST_CITY:
      return {
        ...state,
        cities: state.cities.filter((ct) => ct.rank !== action.rank),
      };
    case GET_CITY: {
      return {
        ...state,
        currentCity: {
          ...state.cities.filter((ct) => ct.Name === action.Name)[0],
        },
      };
    }
    default:
      return state;
  }
};

export const CitiesProvider = ({ children }) => {
  const [cities, citiesDispatch] = React.useReducer(reducer, initState);

  return (
    <CitiesStateCtx.Provider value={cities}>
      <CitiesDispatchCtx.Provider value={citiesDispatch}>
        {children}
      </CitiesDispatchCtx.Provider>
    </CitiesStateCtx.Provider>
  );
};

CitiesProvider.propTypes = {
  children: PropTypes.object,
};
