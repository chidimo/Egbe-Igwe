import React from 'react';

import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '../../testRenderer';

import App from '../../App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}));

describe.skip('NOTES FEATURES', () => {
  const { confirm } = window;

  beforeAll(() => {
    delete window.confirm;
    window.confirm = jest.fn().mockImplementation(() => true);
  });

  afterAll(() => {
    window.confirm = confirm;
  });

  it('can save, edit and delete note', async () => {
    render(<App />);

    const btn = screen.getByRole('button', { name: /login/i });
    const login = screen.getByRole('textbox', { name: '' });
    userEvent.type(login, 'chidimo');
    userEvent.click(btn);

    expect(screen.getByText(/chidimo/)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByText(/fallback/i));

    // assert that there are 15 items on the list
    const allCards = screen.getAllByTestId('city-card');
    expect(allCards.length).toEqual(15);

    allCards.forEach(async (ct, i) => {
      const link = screen.getByTestId(`city-link-${5 + i}`);
      expect(link).toBeInTheDocument();
    });

    // remove the last item from the list
    // this item will have a tabIndex of 5+0+15=20
    userEvent.click(screen.getByTestId('remove-city-19'));
    expect(screen.getAllByTestId('city-card').length).toEqual(14);

    // click on the first item
    userEvent.click(screen.getByTestId('city-link-5'));
    await waitForElementToBeRemoved(() => screen.getByText(/fallback/i));
    expect(true).toBe(true);

    // CREATE NOTE
    const saveBtn = screen.getByRole('button', { name: /save/i });
    const noteInput = screen.getByRole('textbox', { name: '' });

    // TEST TOO FEW CHARACTERS
    const t1 = 'a';
    userEvent.type(noteInput, t1);
    userEvent.click(saveBtn);
    expect(screen.queryByTestId(t1)).toBeNull();

    // TEST TOO MANY CHARACTERS
    const t2 = 'a'.repeat(101);
    userEvent.clear(noteInput);
    userEvent.type(noteInput, t2);
    userEvent.click(saveBtn);
    expect(screen.queryByTestId(t2)).toBeNull();

    // TEST ADEQUATE CHARACTERS
    const t3 = 'note-book';
    userEvent.clear(noteInput);
    userEvent.type(noteInput, t3);
    userEvent.click(saveBtn);

    const tBox = screen.getByText(t3);
    expect(tBox).toBeInTheDocument();

    // TEST EDIT FEATURE
    let editBox;
    userEvent.click(tBox);
    await waitFor(() => {
      editBox = screen.getByTestId('saved-note');
      return expect(editBox).toHaveFocus();
    });

    const t3Update = 'note updated';
    userEvent.clear(editBox);
    userEvent.type(editBox, t3Update);
    editBox.blur();
    expect(screen.getByText(t3Update)).toBeInTheDocument();
    expect(editBox).not.toHaveFocus();

    // TEST DELETE FEATURE
    // create another note
    userEvent.type(noteInput, 'to be deleted');
    userEvent.click(saveBtn);

    // check the number of notes
    // delete second note, then confirm notes reduced by one
    expect(screen.queryAllByTestId('saved-note').length).toEqual(2);
    const tId = screen.queryAllByTestId('delete-note')[1];
    userEvent.click(tId);
    expect(screen.queryAllByTestId('saved-note').length).toEqual(1);

    // VISIT ALL NOTES PAGE
    userEvent.click(screen.getByRole('link', { name: 'chidimo' }));
    await waitForElementToBeRemoved(() => screen.getByText(/fallback/i));
    expect(
      screen.getByRole('heading', { name: /my notes/i }),
    ).toBeInTheDocument();
  });
});
