import { useUserState } from '../auth/context/useUsers';
import { EDIT_NOTE, NEW_NOTE } from '../notes/aTypes';
import { useNotesDispatch } from '../notes/context/useNotes';

export const useSaveNote = () => {
  const { username } = useUserState();
  const notesDispatch = useNotesDispatch();

  const saveNote = (id, text, Name) => {
    switch (true) {
      case text.length < 3:
        alert('Note is too short');
        return;
      case text.length > 100:
        alert('Note is too long. Maximum allowed is 100 characters');
        return;
      case id === undefined:
        notesDispatch({ type: NEW_NOTE, text, username, Name });
        return;
      default:
        notesDispatch({
          type: EDIT_NOTE,
          id,
          text,
          username,
        });
        return;
    }
  };

  return { saveNote };
};
