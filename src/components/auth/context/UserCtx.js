import React from 'react';
import PropTypes from 'prop-types';
import { SET_USER } from '../aTypes';

export const UserStateCtx = React.createContext({});
export const UserDispatchCtx = React.createContext({});

export const initState = {
  username: 'chidimo',
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, username: action.username };
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
