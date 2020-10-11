/* eslint-disable no-console */
import React from 'react';

import { screen, render } from './testRenderer';

/**
 * Attempt to render an object inside the error boundary
 * This should throw
 */

describe('<ErrorBoundary />', () => {
  const { ErrorBoundary } = require('./ErrorBoundary');

  it('renders fallback UI', async () => {
    console.log = jest.fn();
    console.error = jest.fn();

    render(
      <ErrorBoundary>
        <div>{{ key: 'value' }}</div>
      </ErrorBoundary>,
    );

    expect(
      screen.getByRole('heading', {
        name: /There was an error in loading this page./i,
      }),
    ).toBeInTheDocument();
  });
});
