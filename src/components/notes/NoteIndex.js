import React from 'react';
import { Note } from './Note';
import '../city/city.scss';
import { useStoreState } from '../../context/useStore';

const NoteIndex = () => {
  const {
    currentUser: { notes },
  } = useStoreState();

  return (
    <div className="direct-main-child notes-page">
      <p role="heading" className="page-heading">
        My notes
      </p>

      <div>
        {notes?.length === 0 ? (
          <p>Visit a city page to create some notes</p>
        ) : (
          <>
            {notes
              ?.sort((a, b) =>
                a.city.localeCompare(b.city, { sensitivity: 'base' }),
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
