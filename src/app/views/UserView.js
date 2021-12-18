import {create} from 'apisauce';
import {appUrl} from '../../config/api';
import {deleteUser, saveUser} from '../../redux/actions/UserActions';
import {configureStore} from "../../redux/configureStore";

const api = create({
  baseURL: appUrl,
  headers: {'Content-Type': 'multipart/form-data;'},
});

export const register = async user => {
  const response = await api.post('/register', {
    ...user,
  });

  if (response.problem) {
  }
};

export const login = async user => {
  debugger
  const response = await api.post('/login', {
    civil_number: user.civil_number,
    password: user.password,
  });

  if (response.problem) {
    return false;
  }
  saveUser(response.data.token, response.data.profile);
  return true;
};

export const logout = async user => {
  const response = await api.post(
    '/logout',
    {
      civil_number: user.civil_number,
      password: user.password(),
    },
    {headers: {Authorization: `Token ${configureStore.getState().jwt}`}},
  );
  if (response.problem) {
    return false;
  }
  deleteUser();
  return true;
};

export function forgotPassword() {}

export function changePassword() {}
