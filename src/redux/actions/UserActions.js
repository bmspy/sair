import {store} from '../Store';

export const saveUser = (jwt, user) => {
  store.dispatch({
    type: 'USER_SAVE',
    payload: {
      jwt,
      user,
    },
  });
};

export const deleteUser = () => {
  store.dispatch({type: 'USER_DELETE'});
};
