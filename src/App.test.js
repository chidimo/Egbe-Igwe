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

describe.skip('AUTH FEATURE', () => {
  it('<App />', async () => {
    render(<App />);
    expect(true).toBe(true);
  });

  it('logs in and logs out user', async () => {
    render(<App />);

    const btn = screen.getByRole('button', { name: /login/i });
    const login = screen.getByRole('textbox', { name: '' });
    userEvent.type(login, 'chidimo');
    expect(login).toHaveValue('chidimo');

    // login
    userEvent.click(btn);
    const userName = screen.getByText(/chidimo/);

    expect(userName).toBeInTheDocument();
    expect(userName.text).toEqual('chidimo');

    await waitForElementToBeRemoved(() => screen.getByText(/fallback/i));

    expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();

    // logout
    userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(screen.getByRole('textbox', { name: '' })).toBeInTheDocument();
  });
});
