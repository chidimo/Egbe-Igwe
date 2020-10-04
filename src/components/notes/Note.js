import React from 'react';
import { useSaveNote } from '../city/useSaveNote';

export const Note = (props) => {
  const { note } = props;

  const { saveNote } = useSaveNote();

  const [text, setText] = React.useState('');
  const [editing, setEditing] = React.useState(false);

  React.useEffect(() => {
    setText(note.text);
  }, [note]);

  return (
    <div>
      {editing ? (
        <div className="note-editor">
          <textarea
            value={text}
            placeholder="Enter notes"
            onBlur={() => {
              saveNote(note.id, text);
              setEditing(false);
            }}
            onChange={(e) => setText(e.target.value)}
          />

          <div>
            <button
              onClick={() => {
                saveNote(note.id, text);
              }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <p onClick={() => setEditing(true)}>{note.text}</p>
      )}
    </div>
  );
};
