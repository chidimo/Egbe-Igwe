import React from 'react';

import { StoreStateCtx, StoreDispatchCtx } from './StoreCtx';

export const useStoreState = () => {
  const ctx = React.useContext(StoreStateCtx);
  if (ctx === undefined) {
    throw new Error('useStoreState must be used within a StoreProvider');
  }
  return ctx;
};

export const useStoreDispatch = () => {
  const ctx = React.useContext(StoreDispatchCtx);
  if (ctx === undefined) {
    throw new Error('useStoreDispatch must be used within a StoreProvider');
  }
  return ctx;
};
