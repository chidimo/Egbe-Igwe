import { toast } from 'react-toastify';

import { useUserState } from '../auth/context/useUsers';
import { EDIT_NOTE, NEW_NOTE } from '../notes/aTypes';
import { useNotesDispatch } from '../notes/context/useNotes';

const toastId = Symbol('id');

export const useSaveNote = () => {
  const { username } = useUserState();
  const notesDispatch = useNotesDispatch();

  const saveNote = (id, text, Name) => {
    switch (true) {
    case text.length < 3:
      toast.error('Note is too short', { toastId });
      return { success: false };
    case text.length > 100:
      toast.error('Note is too long. Maximum allowed is 100 characters', {
        toastId,
      });
      return { success: false };
    case id === undefined:
      notesDispatch({ type: NEW_NOTE, text, username, Name });
      toast.success('Note saved successfully', { toastId });
      return { success: true };
    default:
      notesDispatch({
        type: EDIT_NOTE,
        id,
        text,
        username,
      });
      toast.success('Note saved successfully', { toastId });
      return { success: true };
    }
  };

  return { saveNote };
};
