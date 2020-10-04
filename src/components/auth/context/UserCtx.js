import React from 'react';
import PropTypes from 'prop-types';
import { LIKE_CITY, LOAD_USER, LOGOUT, SET_USER, UNLIKE_CITY } from '../aTypes';
import { WA_USERNAME } from '../../../utils/storeKeys';

export const UserStateCtx = React.createContext({});
export const UserDispatchCtx = React.createContext({});

export const initState = {
  username: 'chidimo',
  likedCities: [],
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_USER:
      const ls = JSON.parse(localStorage.getItem(WA_USERNAME));
      return ls;
    case SET_USER:
      const u = { ...state, username: action.username };
      localStorage.setItem(WA_USERNAME, JSON.stringify(u));
      return u;
    case LIKE_CITY:
      const u2 = {
        ...state,
        likedCities: state.likedCities.concat(action.Name),
      };
      localStorage.setItem(WA_USERNAME, JSON.stringify(u2));
      return u2;
    case UNLIKE_CITY:
      const u3 = {
        ...state,
        likedCities: state.likedCities.filter((lc) => lc !== action.Name),
      };
      localStorage.setItem(WA_USERNAME, JSON.stringify(u3));
      return u3;
    case LOGOUT:
      // localStorage.removeItem(WA_USERNAME);
      return { ...state, username: '' };
    default:
      break;
  }
};

export const UserProvider = ({ children }) => {
  const [user, userDispatch] = React.useReducer(reducer, initState);
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
