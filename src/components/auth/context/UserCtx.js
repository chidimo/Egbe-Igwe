import React from 'react';
import PropTypes from 'prop-types';
import { LIKE_CITY, LOAD_USER, LOGOUT, LOGIN, UNLIKE_CITY } from '../aTypes';
import {
  WA_CITIES,
  WA_LIKED_CITIES,
  WA_USERNAME,
} from '../../../utils/storeKeys';

export const UserStateCtx = React.createContext({});
export const UserDispatchCtx = React.createContext({});

export const initState = {
  username: '',
  likedCities: [],
};

export const reducer = (state = {}, action) => {
  const lCities = JSON.parse(localStorage.getItem(WA_LIKED_CITIES)) || {};
  switch (action.type) {
  case LOAD_USER: {
    const username = JSON.parse(localStorage.getItem(WA_USERNAME)) || '';
    const userLikes = lCities[username];
    const u1 = { ...state, username, likedCities: userLikes || [] };
    return u1;
  }
  case LOGIN: {
    const userLikes = lCities[action.username];
    const u = {
      ...state,
      username: action.username,
      likedCities: userLikes || [],
    };
    localStorage.setItem(WA_USERNAME, JSON.stringify(action.username));
    return u;
  }
  case LIKE_CITY: {
    const existingLikes = lCities[state.username] || [];
    existingLikes.push(action.Name);
    lCities[state.username] = existingLikes;

    const { cities } = JSON.parse(localStorage.getItem(WA_CITIES));

    const city_exists = cities.filter((ct) => ct.Name === action.Name)[0];
    if (!city_exists) {
      cities.push({ Name: action.Name, Country: action.country });
    }

    localStorage.setItem(WA_CITIES, JSON.stringify({ cities }));

    const u2 = { ...state, likedCities: existingLikes };
    localStorage.setItem(WA_LIKED_CITIES, JSON.stringify(lCities));
    return u2;
  }

  case UNLIKE_CITY: {
    const existingLikes = lCities[state.username];
    const updated = existingLikes.filter((lc) => lc !== action.Name);
    lCities[state.username] = updated;
    const u3 = { ...state, likedCities: updated };
    localStorage.setItem(WA_LIKED_CITIES, JSON.stringify(lCities));
    return u3;
  }
  case LOGOUT:
    localStorage.removeItem(WA_USERNAME);
    return initState;
  default:
    break;
  }
};

export const UserProvider = ({ children }) => {
  const [ user, userDispatch ] = React.useReducer(reducer, initState);

  return (
    <UserStateCtx.Provider value={user}>
      <UserDispatchCtx.Provider value={userDispatch}>
        {children}
      </UserDispatchCtx.Provider>
    </UserStateCtx.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.object,
};
