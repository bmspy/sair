import {UI_START_LOADING, UI_STOP_LOADING, SET_RELOAD} from '../actions/ActionTypes';

const initialState = {
  isLoading: false,
  reload: false,
};

const UIReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UI_START_LOADING':
      return {...state, isLoading: true};
    case 'UI_STOP_LOADING':
      return {...state, isLoading: false};
    case 'SET_RELOAD':
      return {...state, reload: !state.reload};
    default:
      return state;
  }
};

export default UIReducer;

// Developed by Mustafa Alabadla
