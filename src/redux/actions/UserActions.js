import {
  USER_SAVE,
  USER_DELETE,
  SET_SIGNUP_DATA,
  SET_PROFILE,
} from './ActionTypes';

import AsyncStorage from '@react-native-community/async-storage';

import {Alert} from 'react-native';

import axios from 'axios';

import {API_URL} from '@env';

// import deviceStorage from '../../services';

import {uiStartLoading, uiStopLoading} from './UI';

export const setSignupData = signupData => {
  return {
    type: SET_SIGNUP_DATA,
    signupData: signupData,
  };
};

export const postRegister = (regData, navigateToTarget, toast) => {
  return (dispatch, getState) => {
    // console.log(regData);
    axios
      .post(`${API_URL}register/`, regData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res.data);
        dispatch(setToken('id_token', res.data.token));
        dispatch(setToken('have_plan', JSON.stringify(false))); // SAVE HAVE PLANS
        // deviceStorage.saveItem('id_token', res.data.token);
        dispatch(setProfile(res.data.Profile));
        navigateToTarget('HowWillGo');
        toast.show({
          description: 'تم التسجيل بنجاح',
        });
      })
      .catch(error => {
        if (error.response) {
          // console.log(error.response.data);
          // Object.keys(error.response.data).forEach((item, idx) =>
          //   console.log(`${item}: ${error.response.data[item]}`),
          // );
          const errorLog = Object.keys(error.response.data).map(
            (item, idx) => `${item}: ${error.response.data[item]}`,
          );
          console.log(errorLog);
          Alert.alert(
            'بيانات التسجيل غير مكتملة',
            errorLog.map(item => `${item}`).join('\n'),
          );
          // Alert.alert('Error', JSON.stringify(error.response.data, null, 2));
          // alert(error.response.data.JSON.strigify());
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
  };
};

export const setProfile = profile => {
  return {
    type: SET_PROFILE,
    profile: profile,
  };
};

export const postLogin = (formData, navigateToTarget, toast) => {
  return (dispatch, getState) => {
    //   fetch('http://sair.ghaith.om/login/',{
    // method: 'post',
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
    // body: formData
    // }).then(response => {
    //   console.log("Done!")
    //   dispatch(uiStopLoading());
    // }).catch(err => {
    //   console.log(err)
    //   dispatch(uiStopLoading());
    // });
    dispatch(uiStartLoading());
    axios
      .post(`${API_URL}login/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('ok');
        dispatch(uiStopLoading());
        // console.log(res.data);
        dispatch(setToken('id_token', res.data.token));
        dispatch(setToken('have_plan', JSON.stringify(res.data.have_plan))); // SAVE HAVE PLANS
        // deviceStorage.saveItem('id_token', res.data.token);
        dispatch(setProfile(res.data.Profile));
        navigateToTarget('HowWillGo');
        //GET TOKEN
        // dispatch(getToken()).then(token => {
        //   console.log('token: ', token);
        // });
        toast.show({
          description: `أهلا بك ${res.data.Profile.full_name}`,
        });
      })
      .catch(error => {
        console.log('not ok');
        console.log(error);
        dispatch(uiStopLoading());
        if (error.response) {
          // console.log(error.response.data);
          // Object.keys(error.response.data).forEach((item, idx) =>
          //   console.log(`${item}: ${error.response.data[item]}`),
          // );
          const errorLog = Object.keys(error.response.data).map(
            (item, idx) => `${item}: ${error.response.data[item]}`,
          );
          console.log(errorLog);
          Alert.alert(
            'حصل خطأ أثناء عملية تسجيل الدخول',
            errorLog.map(item => `${item}`).join('\n'),
          );
          // Alert.alert('Error', JSON.stringify(error.response.data, null, 2));
          // alert(error.response.data.JSON.strigify());
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
  };
};

export const postLogout = navigateToTarget => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(deleteToken()).then(() => {
      dispatch(uiStopLoading());
      dispatch(setProfile({}));
      navigateToTarget('SignIn');
    });
  };
};

export const postForgetPassword = (email, navigateToTarget, toast) => {
  return dispatch => {
    dispatch(uiStartLoading());
    // dispatch(getToken()).then(() => {
    axios
      .post(`${API_URL}forget/password/`, email, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        dispatch(uiStopLoading());
        navigateToTarget('SignIn');
        toast.show({
          description: `${res.data.message}`,
        });
      })
      .catch(error => {
        dispatch(uiStopLoading());
        if (error.response) {
          // console.log(error.response.data);
          // Object.keys(error.response.data).forEach((item, idx) =>
          //   console.log(`${item}: ${error.response.data[item]}`),
          // );
          // const errorLog = Object.keys(error.response.data).map(
          //   (item, idx) => `${item}: ${error.response.data[item]}`,
          // );
          // console.log(errorLog);
          Alert.alert(
            'حصل خطأ أثناء عملية استرجاع كلمة المرور',
            error.response.data.message,
          );
          // Alert.alert('Error', JSON.stringify(error.response.data, null, 2));
          // alert(error.response.data.JSON.strigify());
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
    // });
  };
};

export const postChangePassword = (formData, navigateToTarget, toast) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(getToken()).then(token => {
      // console.log(token);
      axios
        .post(`${API_URL}change_password/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          dispatch(uiStopLoading());
          // console.log('data', res.data);
          navigateToTarget('Profile');
          toast.show({
            description: `${res.data.message}`,
          });
        })
        .catch(error => {
          dispatch(uiStopLoading());
          if (error.response) {
            // console.log(error.response.data);
            // Object.keys(error.response.data).forEach((item, idx) =>
            //   console.log(`${item}: ${error.response.data[item]}`),
            // );
            // const errorLog = Object.keys(error.response.data).map(
            //   (item, idx) => `${item}: ${error.response.data[item]}`,
            // );
            // console.log(errorLog);
            Alert.alert(
              'حدث خطأ أثناء عملية تغيير كلمة المرور',
              error.response.data.map(item => `${item}`).join('\n'),
            );
            // Alert.alert('Error', JSON.stringify(error.response.data, null, 2));
            // alert(error.response.data.JSON.strigify());
            // console.log(error.response.status);
            // console.log(error.response.headers);
          }
        });
    });
  };
};

export const putEditProfile = (formData, navigateToTarget, toast) => {
  return (dispatch, getState) => {
    dispatch(uiStartLoading());
    dispatch(getToken()).then(token => {
      // console.log(token);
      axios
        .put(`${API_URL}edit/profile/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          dispatch(uiStopLoading());
          const profile = getState().user.profile;
          profile.full_name = res.data.data.full_name;
          profile.email = res.data.data.email;
          profile.mobile = res.data.data.full_namobileme;
          profile.image = formData.image;
          console.log(profile);
          dispatch(setProfile(profile));
          console.log('data', res.data);
          navigateToTarget('Profile');
          toast.show({
            description: 'تم تعديل البيانات بنجاح',
          });
        })
        .catch(error => {
          dispatch(uiStopLoading());
          if (error.response) {
            // console.log(error.response.data);
            // Object.keys(error.response.data).forEach((item, idx) =>
            //   console.log(`${item}: ${error.response.data[item]}`),
            // );
            // const errorLog = Object.keys(error.response.data).map(
            //   (item, idx) => `${item}: ${error.response.data[item]}`,
            // );
            // console.log(errorLog);
            Alert.alert(
              'حدث خطأ أثناء عملية تعديل الملف الشخصي',
              error.response.data.map(item => `${item}`).join('\n'),
            );
            // Alert.alert('Error', JSON.stringify(error.response.data, null, 2));
            // alert(error.response.data.JSON.strigify());
            // console.log(error.response.status);
            // console.log(error.response.headers);
          }
        });
    });
  };
};

export const getProfile = (token, navigateToTarget) => {
  return (dispatch, getState) => {
    // dispatch(uiStartLoading());
    // dispatch(getToken())
    //   .then(token => {
    // console.log(token);
    axios
      .get(`${API_URL}get/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(res => {
        // dispatch(uiStopLoading());
        // console.log(res.data);
        dispatch(setProfile(res.data));
        navigateToTarget('HowWillGo');
        // toast.show({
        //   description: 'تم تعديل البيانات بنجاح',
        // });
      })
      .catch(error => {
        // dispatch(uiStopLoading());
        if (error.response) {
          navigateToTarget('SignIn');
          // console.log(error.response.data);
          // Object.keys(error.response.data).forEach((item, idx) =>
          //   console.log(`${item}: ${error.response.data[item]}`),
          // );
          // const errorLog = Object.keys(error.response.data).map(
          //   (item, idx) => `${item}: ${error.response.data[item]}`,
          // );
          // console.log(errorLog);
          // Alert.alert(
          //   'حدث خطأ أثناء عملية تعديل الملف الشخصي',
          //   error.response.data.map(item => `${item}`).join('\n'),
          // );
          // Alert.alert('Error', JSON.stringify(error.response.data, null, 2));
          // alert(error.response.data.JSON.strigify());
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
      });
    // })
    // .catch(err => {
    //   navigateToTarget('SignIn');
    // });
  };
};

export const setToken = (key, value) => {
  return (dispatch, getState) => {
    try {
      AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  };
};

export const getToken = () => {
  return (dispatch, getState) => {
    try {
      return AsyncStorage.getItem('id_token');
      // dispatch(storeToken(token));

      // if (token !== null) {

      // }
      // if (value !== null) {
      //   this.setState({
      //     jwt: value,
      //     loading: false
      //   });
      // } else {
      //   this.setState({
      //     loading: false
      //   });
      // }
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  };
};

export const deleteToken = () => {
  return (dispatch, getState) => {
    try {
      return AsyncStorage.removeItem('id_token');
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  };
};

// export const storeToken = token => {
//   return {
//     type: STORE_TOKEN,
//     token: token,
//   };
// };
//OLD Code
// import {store} from '../Store';

// export const saveUser = (jwt, user) => {
//   store.dispatch({
//     type: 'USER_SAVE',
//     payload: {
//       jwt,
//       user,
//     },
//   });
// };

// export const deleteUser = () => {
//   store.dispatch({type: 'USER_DELETE'});
// };
