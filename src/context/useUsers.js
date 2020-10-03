import React from 'react';

import { UsersStateCtx, UsersDispatchCtx } from './UsersCtx';

export const useUsersState = () => {
  const ctx = React.useContext(UsersStateCtx);
  if (ctx === undefined) {
    throw new Error('useUsersState must be used within a UsersProvider');
  }
  return ctx;
};

export const useUsersDispatch = () => {
  const ctx = React.useContext(UsersDispatchCtx);
  if (ctx === undefined) {
    throw new Error('useUsersDispatch must be used within a UsersProvider');
  }
  return ctx;
};
