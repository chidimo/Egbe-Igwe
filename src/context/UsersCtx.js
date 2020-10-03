import React from 'react';
import PropTypes from 'prop-types';

export const UsersStateCtx = React.createContext({});
export const UsersDispatchCtx = React.createContext({});

export const initState = {
  username: '',
  cities: [],
};

export const reducer = (action, state={}) => {
    switch (action.type) {
      default:
        break;
    }
  }

export const UsersProvider = ({ children }) => {
  const [ notes, notesDisp ] = React.useReducer(
    reducer,
    initState
  );

  return (
    <UsersStateCtx.Provider value={notes}>
      <UsersDispatchCtx.Provider value={notesDisp}>
        {children}
      </UsersDispatchCtx.Provider>
    </UsersStateCtx.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.object,
};
