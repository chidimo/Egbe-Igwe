import React from 'react';

import './note.scss';

export const NoteEditor = (props) => {
  const { id, value, onClick, onBlur, onChange } = props;

  return (
    <div className="note-container">
      <textarea
        id={id}
        value={value}
        placeholder="Enter notes"
        onChange={onChange}
        onBlur={onBlur || null}
      />

      {onClick && (
        <div>
          <button className="pointer" onClick={onClick}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};
