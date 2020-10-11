import React from 'react';
import PropTypes from 'prop-types';

import './note.scss';

export const NoteEditor = (props) => {
  const { id, value, onClick, onBlur, onChange, dataTestId } = props;

  return (
    <div className="note-container">
      <textarea
        id={id}
        data-testid={dataTestId}
        value={value}
        className="fixed-height"
        placeholder="Enter note (3 to 100 characters)"
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

NoteEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  dataTestId: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
};
