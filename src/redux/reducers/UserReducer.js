const defaultState = {
  jwt: null,
  user: null,
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_SAVE': {
      return {
        ...state,
        ...{jwt: action.payload.jwt, user: action.payload.user},
      };
    }

    case 'USER_DELETE': {
      return defaultState;
    }

    default:
      return defaultState;
  }
};

export default UserReducer;
