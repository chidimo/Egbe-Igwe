import React from 'react';
import PropTypes from 'prop-types';

export const NotesStateCtx = React.createContext({});
export const NotesDispatchCtx = React.createContext({});

export const initState = {};

export const reducer = (action, state = {}) => {
  switch (action.type) {
    default:
      break;
  }
};

export const NotesProvider = ({ children }) => {
  const [notes, notesDisp] = React.useReducer(reducer, initState);

  return (
    <NotesStateCtx.Provider value={notes}>
      <NotesDispatchCtx.Provider value={notesDisp}>
        {children}
      </NotesDispatchCtx.Provider>
    </NotesStateCtx.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.object,
};
