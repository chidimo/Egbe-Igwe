import { toast } from 'react-toastify';
import { EDIT_NOTE, NEW_NOTE } from '../../context/aTypes';
import { useStoreDispatch } from '../../context/useStore';

const toastId = Symbol('id');

export const useSaveNote = () => {
  const storeDispatch = useStoreDispatch();

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
      storeDispatch({ type: NEW_NOTE, text, Name });
      toast.success('Note saved successfully', { toastId });
      return { success: true };
    default:
      storeDispatch({
        type: EDIT_NOTE,
        id,
        text,
      });
      toast.success('Note saved successfully', { toastId });
      return { success: true };
    }
  };

  return { saveNote };
};
