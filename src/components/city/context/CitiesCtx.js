import React from "react";
import PropTypes from "prop-types";

import { DELIST_CITY, GET_CITIES } from "../aTypes";

export const CitiesStateCtx = React.createContext({});
export const CitiesDispatchCtx = React.createContext({});

export const initState = {
  cities: [], 
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CITIES:
      return { ...state, cities: action.cities };
    case DELIST_CITY:
      return {
        ...state,
        cities: state.cities.filter((ct) => ct.rank !== action.rank)
      };
    default:
      break;
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
  children: PropTypes.object
};