/**
 * User model as defined in Strapi
 */

import {
  login,
  logout,
  register,
  changePassword,
  forgotPassword,
} from '../views/UserView';

class UserModel {
  constructor(
    full_name,
    email,
    identifier,
    password,
    confirm_password,
    image,
    mobile,
    civil_number,
    job,
    job_number,
    department,
    gender,
  ) {
    this.full_name = full_name;
    this.email = email;
    this.identifier = identifier;
    this.password = password;
    this.confirm_password = confirm_password;
    this.mobile = mobile;
    this.civil_number = civil_number;
    this.job = job;
    this.job_number = job_number;
    this.image = image;
    this.department = department;
    this.gender = gender;
  }

  async login() {
    const result = await login(this);

    if (!result) {
      throw new Error('Unable to login user.');
    }

    return true;
  }

  async logout() {
    const result = await logout(this);

    if (!result) {
      throw new Error('Unable to logout user.');
    }

    return true;
  }

  async register() {
    const result = await register(this);

    if (!result) {
      throw new Error('لم يتم التسجيل بنجاح');
    }

    return true;
  }

  async changePassword(newPassword) {
    const result = await changePassword(this, newPassword);

    if (!result) {
      throw new Error('لم يتم تغير كلمة السر بنجاح');
    }
    return true;
  }

  async forgotPassword(newPassword) {
    const result = await forgotPassword(this, newPassword);

    if (!result) {
      throw new Error('حدذ خطأ في أثناء الإتصال بالخادم يرجى إعادة المحاولة');
    }
    return true;
  }
}

export default UserModel;
