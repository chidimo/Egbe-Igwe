import React from 'react';

import {
  render,
  screen,
  utFuncs,
  userEvent,
  // waitFor,
  waitForElementToBeRemoved,
} from '../../testRenderer';

import App from '../../App';

describe('LOCATION FEATURE', () => {
  it('can locate user', async () => {
    // mock debounce such that it doesn't delay the function
    jest.spyOn(utFuncs, 'debounce').mockImplementation((fn) => fn);

    render(<App />);

    const btn = screen.getByRole('button', { name: /login/i });
    const login = screen.getByRole('textbox', { name: '' });
    userEvent.type(login, 'chidimo');
    userEvent.click(btn);

    expect(screen.getByText(/chidimo/)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/fallback/i));

    const schInput = screen.getByTestId('locate-me');
    userEvent.click(schInput);
    // screen.debug();

    await waitForElementToBeRemoved(() => screen.getByText(/locating/i));
    expect(
      screen.getByText(new RegExp('Add your first note for', 'i')),
    ).toBeInTheDocument();
  });
});
