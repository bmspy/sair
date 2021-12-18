import {
  SET_PLAN,
  SET_PLANS,
  SET_PLACE_DATA,
  SET_PLAN_DONE_MODAL,
  SET_PLAN_DETAILS_DATE,
} from './ActionTypes';

import AsyncStorage from '@react-native-community/async-storage';

import {Alert} from 'react-native';

import axios from 'axios';

import {API_URL} from '@env';

import {uiStartLoading, uiStopLoading, setReload} from './UI';
import {getToken} from './UserActions';

export const createPlan = (formData, navigateToTarget, toast) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(getToken()).then(token => {
      // console.log(token);
      axios
        .post(`${API_URL}post/plan/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          if (res.statusText === 'OK') {
            dispatch(uiStopLoading());
            console.log('data', res.data);
            dispatch(setPlan(formData));
            navigateToTarget('SchoolRoute');
            toast.show({
              description: 'تمت إضافة الخطة بنجاح',
            });
          } else {
            dispatch(uiStopLoading());
            console.log(res);
            alert('يبدو أن هناك خطأ ما ، يرجى إعادة المحاولة لاحقا');
          }
        })
        .catch(error => {
          dispatch(uiStopLoading());
          // if (error.response.status !== 200 || error.response.status !== 201) {
          //   alert('An error has occured. Please try again.');
          // }
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
              'حدث خطأ أثناء عملية إضافة الخطة',
              error.response.data.msg,
              // errorLog.map(item => `${item}`).join('\n'),
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

export const postPlanDone = (formData, toast) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(getToken()).then(token => {
      // console.log(token);
      axios
        .post(`${API_URL}post/plan/done/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          if (res.statusText === 'OK') {
            dispatch(uiStopLoading());
            dispatch(setReload());
            console.log('data', res.data);
            dispatch(setPlan(formData));
            toast.show({
              description: 'تمت تأكيد التنفيذ بنجاح',
            });
            dispatch(setPlanDoneModal(true));
          } else {
            dispatch(uiStopLoading());
            console.log(res);
            alert('يبدو أن هناك خطأ ما ، يرجى إعادة المحاولة لاحقا');
          }
        })
        .catch(error => {
          dispatch(uiStopLoading());
          // if (error.response.status !== 200 || error.response.status !== 201) {
          //   alert('An error has occured. Please try again.');
          // }
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
              'حدث خطأ أثناء عملية تأكيد التنفيذ',
              error.response.data.message,
              // errorLog.map(item => `${item}`).join('\n'),
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

export const setPlan = plan => {
  return {
    type: SET_PLAN,
    plan: plan,
  };
};

export const setNewPlace = placeData => {
  return {
    type: SET_PLACE_DATA,
    placeData: placeData,
  };
};

export const setPlanDoneModal = planDoneModal => {
  return {
    type: SET_PLAN_DONE_MODAL,
    planDoneModal: planDoneModal,
  };
};

export const setPlanDetailsDate = planDetailsDate => {
  return {
    type: SET_PLAN_DETAILS_DATE,
    planDetailsDate: planDetailsDate,
  };
};
