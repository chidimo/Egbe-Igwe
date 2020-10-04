import React from 'react';
import PropTypes from 'prop-types';

import {
  LOAD_NOTES,
  DELETE_NOTE,
  NEW_NOTE,
  EDIT_NOTE,
  GET_NOTE,
} from '../aTypes';
import { WA_NOTES } from '../../../utils/storeKeys';

export const NotesStateCtx = React.createContext({});
export const NotesDispatchCtx = React.createContext({});

export const initState = {};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_NOTES: {
      const db = JSON.parse(localStorage.getItem(WA_NOTES)) || {};
      // if the user is not in the db add an entry for them
      if (!db[action.username]) {
        db[action.username] = [];
        localStorage.setItem(WA_NOTES, JSON.stringify(db));
      }
      return db;
    }
    case GET_NOTE:
      return state;
    case NEW_NOTE: {
      const userNotes = state[action.username] || [];
      userNotes.push({
        id: userNotes.length + 1,
        text: action.text,
        city: action.Name,
      });
      const updated = { ...state, [action.username]: userNotes };
      localStorage.setItem(WA_NOTES, JSON.stringify(updated));
      return updated;
    }
    case EDIT_NOTE: {
      const userNotes = state[action.username];
      const note = userNotes.filter((nt) => nt.id === action.id)[0];
      if (note) {
        note['text'] = action.text;
      }
      const updated = { ...state, [action.username]: userNotes };
      localStorage.setItem(WA_NOTES, JSON.stringify(updated));
      return updated;
    }
    case DELETE_NOTE: {
      const userNotes = state[action.username];
      const updated = userNotes.filter((nt) => nt.id !== action.id);
      localStorage.setItem(WA_NOTES, JSON.stringify(updated));
      return updated;
    }
    default:
      return state;
  }
};

export const NotesProvider = ({ children }) => {
  const [notes, notesDispatch] = React.useReducer(reducer, initState);

  return (
    <NotesStateCtx.Provider value={notes}>
      <NotesDispatchCtx.Provider value={notesDispatch}>
        {children}
      </NotesDispatchCtx.Provider>
    </NotesStateCtx.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.object,
};
