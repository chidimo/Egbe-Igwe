import React from 'react';

import { CitiesStateCtx, CitiesDispatchCtx } from './CitiesCtx';

export const useCitiesState = () => {
  const ctx = React.useContext(CitiesStateCtx);
  if (ctx === undefined) {
    throw new Error(
      'useCitiesState must be used within a CitiesProvider'
    );
  }
  return ctx;
};

export const useCitiesDispatch = () => {
  const ctx = React.useContext(CitiesDispatchCtx);
  if (ctx === undefined) {
    throw new Error(
      'useCitiesDispatch must be used within a CitiesProvider'
    );
  }
  return ctx;
};
