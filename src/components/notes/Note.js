import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useSaveNote } from '../city/useSaveNote';
import { NoteEditor } from './NoteEditor';
import { IconSet } from '../IconSet';

import './note.scss';
import { useStoreDispatch } from '../../context/useStore';
import { DELETE_NOTE } from '../../context/aTypes';

export const Note = (props) => {
  const { note, indexPage } = props;

  const { saveNote } = useSaveNote();
  const storeDispatch = useStoreDispatch();

  const rf = React.useRef();
  const [ text, setText ] = React.useState('');
  const [ editing, setEditing ] = React.useState(false);

  React.useEffect(() => {
    if (rf.current) {
      rf.current.style.height = rf.current.scrollHeight + 'px';
    }
  }, []);

  React.useEffect(() => {
    setText(note.text);
  }, [ note ]);

  const activateEditor = () => {
    setEditing(true);
    setTimeout(() => {
      document.getElementById(note.id).focus();
    }, 250);
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
                  storeDispatch({ type: DELETE_NOTE, id: note.id });
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
              ref={(node) => (rf.current = node)}
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

Note.propTypes = {
  note: PropTypes.object,
  indexPage: PropTypes.bool,
};
