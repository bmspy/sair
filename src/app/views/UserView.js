import {create} from 'apisauce';
import {appUrl} from '../../config/api';
import {saveUser} from "../../redux/actions/UserActions";

const api = create({
  baseURL: appUrl,
  headers: {'Content-Type': 'multipart/form-data;'},
});

export const login = async user => {
  const response = await api.post('/login', {
    civil_number: user.civil_number,
    password: user.password(),
  });

  if (response.problem) {
    return false;
  }
  saveUser(response.data.token)
  return true;
};

export function forgotPassword() {}

export function changePassword() {}
export function register() {}

export function logout() {}
