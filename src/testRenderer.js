import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { StoreProvider } from './context/StoreCtx';

const Wrapper = ({ children }) => {
  return (
    <StoreProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </StoreProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
export { axios, userEvent };

Wrapper.propTypes = {
  children: PropTypes.object,
};
