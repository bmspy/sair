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
    identifier,
    password,
    confirmPassword,
    fullName,
    email,
    image,
    mobile,
    civilNumber,
    job,
    jobNumber,
    department,
    gender,
  ) {
    this.identifier = identifier;
    this.password = password;
    this.confirmPassword = this.fullName = fullName;
    this.email = email;
    this.image = image;
    this.mobile = mobile;
    this.civilNumber = civilNumber;
    this.job = job;
    this.jobNumber = jobNumber;
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
