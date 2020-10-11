import React from 'react';

import {
  render,
  screen,
  utFuncs,
  userEvent,
  waitForElementToBeRemoved,
} from '../../testRenderer';

import App from '../../App';

describe('SEARCH FEATURE', () => {
  it('can search for city', async () => {
    // mock debounce such that it doesn't delay the function
    jest.spyOn(utFuncs, 'debounce').mockImplementation((fn) => fn);

    render(<App />);

    const btn = screen.getByRole('button', { name: /login/i });
    const login = screen.getByRole('textbox', { name: '' });
    userEvent.type(login, 'chidimo');
    userEvent.click(btn);

    expect(screen.getByText(/chidimo/)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/fallback/i));

    const schInput = screen.getByRole('textbox', { name: '' });

    // TEST TOO FEW CHARACTERS
    userEvent.type(schInput, 'ne');
    expect(
      screen.getByText('Please enter at least 3 characters'),
    ).toBeInTheDocument();

    // TEST ADEQUATE CHARACTERS
    // return a city with exact name
    const city = 'Enugu';
    const regex = new RegExp(`${city}`, 'i');

    userEvent.clear(schInput);
    userEvent.type(schInput, city);
    expect(schInput).toHaveValue(city);

    await waitForElementToBeRemoved(() => screen.getByText(/locating/i));

    const link = screen.getByRole('link', { name: regex });
    userEvent.click(link);
    await waitForElementToBeRemoved(() => screen.getByText(/locating/i));

    const res = screen.getByRole('heading', { name: regex });
    expect(res).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(`Add your first note for ${city}`, 'i')),
    ).toBeInTheDocument();
  });
});
