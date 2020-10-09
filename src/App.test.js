import React from 'react';

import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from './testRenderer';

import App from './App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

describe('<App />', () => {
  it('Renders <App /> component correctly', async () => {
    render(<App />);
    expect(true).toBe(true);
  });

  it('logs in and logs out user', async () => {
    render(<App />);

    const btn = screen.getByTestId('login-btn');
    const login = screen.getByTestId('username-input');
    userEvent.type(login, 'chidimo');
    expect(login).toHaveValue('chidimo');

    // login
    userEvent.click(btn);
    const userName = screen.getByTestId('username');
    expect(userName).toBeInTheDocument();
    expect(userName.text).toEqual('chidimo');

    await waitForElementToBeRemoved(() => screen.getByText(/Fallback/i));

    expect(screen.getByTestId('search')).toBeInTheDocument();

    // logout
    userEvent.click(screen.getByTestId('logout-btn'));
    expect(screen.getByTestId('username-input')).toBeInTheDocument();
  });
});
