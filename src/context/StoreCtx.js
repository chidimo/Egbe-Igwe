import React from 'react';
import PropTypes from 'prop-types';

import { store as initStore } from './store';
import { reducer } from './reducer';

export const StoreStateCtx = React.createContext({});
export const StoreDispatchCtx = React.createContext({});

export const StoreProvider = ({ children }) => {
  const [ store, storeDispatch ] = React.useReducer(
    reducer,
    initStore.getState(),
  );
  // console.log('store', store)

  return (
    <StoreStateCtx.Provider value={store}>
      <StoreDispatchCtx.Provider value={storeDispatch}>
        {children}
      </StoreDispatchCtx.Provider>
    </StoreStateCtx.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.object,
};
