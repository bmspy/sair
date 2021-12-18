import {
  USER_SAVE,
  USER_DELETE,
  SET_SIGNUP_DATA,
  SET_PROFILE,
} from '../actions/ActionTypes';

const initialState = {
  jwt: null,
  user: null,
  signupData: {},
  profile: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SAVE: {
      return {
        ...state,
        ...{jwt: action.payload.jwt, user: action.payload.user},
      };
    }
    case USER_DELETE: {
      return initialState;
    }
    case SET_SIGNUP_DATA: {
      return {
        ...state,
        signupData: action.signupData,
      };
    }
    case SET_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    default:
      return state;
  }
};
export default UserReducer;

// OLD CODE
// const defaultState = {
//   jwt: null,
//   user: null,
// };

// const UserReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case 'USER_SAVE': {
//       return {
//         ...state,
//         ...{jwt: action.payload.jwt, user: action.payload.user},
//       };
//     }

//     case 'USER_DELETE': {
//       return defaultState;
//     }

//     default:
//       return defaultState;
//   }
// };

// export default UserReducer;
