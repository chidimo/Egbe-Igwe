import React from 'react';
import {useNotesDispatch, useNotesState} from './context/useNotes';
import {useUserState} from '../auth/context/useUsers';
import {LOAD_NOTES} from './aTypes';
import {Note} from './Note';
import '../city/city.scss';

const NoteIndex = () => {
  const {username} = useUserState();

  const notes = useNotesState();
  const notesDispatch = useNotesDispatch();
  const myNotes = notes[username];

  React.useEffect(() => {
    notesDispatch({type: LOAD_NOTES, username});
  }, [notesDispatch, username]);

  return (
    <div className="direct-main-child notes-page">
      <h2>My notes</h2>

      <div>
        {myNotes?.length === 0 ? (
          <p>Visit a city page to create some notes</p>
        ) : (
          <>
            {myNotes
              ?.sort((a, b) =>
                a.city.localeCompare(b.city, {sensitivity: 'base'}),
              )
              .map((n) => {
                return <Note key={n.id} note={n} indexPage={true} />;
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default NoteIndex;
