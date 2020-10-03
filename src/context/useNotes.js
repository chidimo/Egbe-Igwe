import React from 'react';

import { NotesStateCtx, NotesDispatchCtx } from './NotesCtx';

export const useNotesState = () => {
  const ctx = React.useContext(NotesStateCtx);
  if (ctx === undefined) {
    throw new Error(
      'useNotesState must be used within a NotesProvider'
    );
  }
  return ctx;
};

export const useNotesDispatch = () => {
  const ctx = React.useContext(NotesDispatchCtx);
  if (ctx === undefined) {
    throw new Error(
      'useNotesDispatch must be used within a NotesProvider'
    );
  }
  return ctx;
};
