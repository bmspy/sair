import {CREATE_NOTE, SET_NOTES, SET_NOTE, SET_NOTE_DATE} from '../actions/ActionTypes';

const initialState = {
  notes: [],
  note: {},
  noteDate: new Date(),
};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE: {
      return {
        ...state,
        notes: action.notes,
      };
    }
    case SET_NOTES: {
      return {
        ...state,
        notes: action.notes,
      };
    }
    case SET_NOTE: {
      return {
        ...state,
        note: action.note,
      };
    }
    case SET_NOTE_DATE: {
      return {
        ...state,
        noteDate: action.noteDate,
      };
    }
    default:
      return state;
  }
};
export default NoteReducer;

// Developed by Mustafa Alabadla
