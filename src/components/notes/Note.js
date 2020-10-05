import React from 'react';
import { useSaveNote } from '../city/useSaveNote';
import { NoteEditor } from './NoteEditor';
import { IconSet } from '../IconSet';

import './note.scss';
import { useNotesDispatch } from './context/useNotes';
import { DELETE_NOTE } from './aTypes';
import { useUserState } from '../auth/context/useUsers';
import { Link } from 'react-router-dom';

export const Note = (props) => {
  const { note, indexPage } = props;

  const { saveNote } = useSaveNote();
  const { username } = useUserState();
  const notesDisaptch = useNotesDispatch();

  const [text, setText] = React.useState('');
  const [editing, setEditing] = React.useState(false);

  React.useEffect(() => {
    setText(note.text);
  }, [note]);

  const activateEditor = () => {
    setEditing(true);
    setTimeout(() => {
      document.getElementById(note.id).focus();
    }, 300);
  };

  return (
    <div>
      {editing ? (
        <>
          <NoteEditor
            id={note.id}
            value={text}
            onBlur={() => {
              saveNote(note.id, text);
              setEditing(false);
            }}
            onChange={(e) => setText(e.target.value)}
          />
        </>
      ) : (
        <div className="note-container">
          <div className="close-container pointer">
            <span
              onClick={() => {
                if (window.confirm('Are you sure')) {
                  notesDisaptch({ type: DELETE_NOTE, id: note.id, username });
                }
              }}
            >
              <IconSet name="cancel" color="red" size="1.7rem" />
            </span>
          </div>

          <div className="textarea-container">
            <textarea
              value={note.text}
              placeholder="Enter notes"
              className="disabled"
              onChange={() => {}}
              onFocus={activateEditor}
              onClick={activateEditor}
            />
          </div>

          {indexPage && (
            <div className="extra-info">
              <Link to={`/city/${note.city}`}>{note.city}</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
