import React from 'react';

import { UserStateCtx, UserDispatchCtx } from './UserCtx';

export const useUserState = () => {
  const ctx = React.useContext(UserStateCtx);
  if (ctx === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return ctx;
};

export const useUserDispatch = () => {
  const ctx = React.useContext(UserDispatchCtx);
  if (ctx === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return ctx;
};
