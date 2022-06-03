import {
  SET_PLAN,
  SET_PLANS,
  SET_PLACE_DATA,
  SET_PLAN_DONE_MODAL,
  SET_PLAN_DETAILS_DATE,
  SET_PLAN_APPROVE_MODAL,
  SET_MONTH_PLAN_ID,
  SET_SELECTED_DATE,
} from './ActionTypes';

import AsyncStorage from '@react-native-community/async-storage';

import {Alert} from 'react-native';

import axios from 'axios';

import {API_URL} from '@env';

import {uiStartLoading, uiStopLoading, setReload} from './UI';
import {setToken} from './UserActions';
import {getToken} from './UserActions';

export const createPlan = (formData, navigateToTarget, toast) => {
  return (dispatch, getState) => {
    dispatch(uiStartLoading());
    // console.log(getState().plan.plan.go_method);
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
          console.log(res.status);
          if (res.status === 201 || res.status === 200) {
            dispatch(uiStopLoading());
            console.log('data', res.data);
            console.log('go_method', res.data.plan_details.go_method);
            dispatch(setReload());
            // Set Plan Complete to Async
            // dispatch(setToken('plan_complete', JSON.stringify(res.data.plan_details.is_finshed)));
            // AsyncStorage.setItem('plan_complete', res.data.plan_details.is_finshed);
            toast.show({
              description: 'تمت إضافة الخطة بنجاح',
            });
            if (res.data.plan_details.destination_details.type === 'other_place') {
              dispatch(setPlan({}));
              navigateToTarget('AddPlane');
            } else {
              dispatch(setPlan(res.data.plan_details));
              navigateToTarget('SchoolRoute');
            }
          } else {
            dispatch(uiStopLoading());
            console.log(res);
            alert('يبدو أن هناك خطأ ما ، يرجى إعادة المحاولة لاحقا');
          }
        })
        .catch(error => {
          dispatch(uiStopLoading());
          // console.log(error.response.data);
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
              'حدث خطأ أثناء عملية إضافة الخطة   ',
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

export const addPlan = (formData, navigateToTarget, toast) => {
  return (dispatch, getState) => {
    dispatch(uiStartLoading());
    // console.log(getState().plan.plan.go_method);
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
          console.log(res.status);
          if (res.status === 201) {
            dispatch(uiStopLoading());
            console.log('data', res.data);
            // console.log('go_method', res.data.plan_details.go_method);
            // dispatch(setPlan(formData));
            // Set Plan Complete to Async
            // dispatch(setToken('plan_complete', JSON.stringify(res.data.plan_details.is_finshed)));
            // AsyncStorage.setItem('plan_complete', res.data.plan_details.is_finshed);
            toast.show({
              description: 'تمت إضافة الخطة بنجاح',
            });
            dispatch(setPlan({}));
            navigateToTarget('PlaneDetails');
          } else {
            dispatch(uiStopLoading());
            console.log(res);
            alert('يبدو أن هناك خطأ ما ، يرجى إعادة المحاولة لاحقا');
          }
        })
        .catch(error => {
          dispatch(uiStopLoading());
          dispatch(setPlan({}));
          console.log(error.response.data);
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
              'حدث خطأ أثناء عملية إضافة الخطة   ',
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

export const editPlan = (formData, navigateToTarget, toast) => {
  return (dispatch, getState) => {
    dispatch(uiStartLoading());
    // console.log(getState().plan.plan.go_method);
    dispatch(getToken()).then(token => {
      // console.log(token);
      axios
        .put(`${API_URL}edit/plan/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          console.log(res.status);
          if (res.status === 201 || res.status === 200) {
            dispatch(uiStopLoading());
            console.log('data', res.data);
            // console.log('go_method', res.data.plan_details.go_method);
            // dispatch(setPlan(formData));
            // Set Plan Complete to Async
            // dispatch(setToken('plan_complete', JSON.stringify(res.data.plan_details.is_finshed)));
            // AsyncStorage.setItem('plan_complete', res.data.plan_details.is_finshed);
            toast.show({
              description: 'تم استبدال الخطة بنجاح',
            });
            dispatch(setPlan({}));
            navigateToTarget('PlaneDetails');
          } else {
            dispatch(uiStopLoading());
            console.log(res);
            alert('يبدو أن هناك خطأ ما ، يرجى إعادة المحاولة لاحقا');
          }
        })
        .catch(error => {
          dispatch(uiStopLoading());
          dispatch(setPlan({}));
          console.log(error.response.data);
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
              'حدث خطأ أثناء عملية إضافة الخطة   ',
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

export const postPlanDone = (formData, toast, done) => {
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
          if (res.status === 201) {
            dispatch(uiStopLoading());
            dispatch(setReload());
            console.log('data', res.data);
            dispatch(setPlan(formData));
            toast.show({
              description: 'تمت تأكيد التنفيذ بنجاح',
            });
            if (done === 0) {
              dispatch(setPlanDoneModal(true));
            }
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

export const planApprove = (formData) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(getToken()).then(token => {
      // console.log(token);
      axios
        .post(`${API_URL}post/month/plan/approve/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          if (res.status === 201) {
            dispatch(uiStopLoading());
            dispatch(setPlanApproveModal(true));
            console.log('data', res.data);
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
              'حدث خطأ أثناء عملية تأكيد الخطة',
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

// APPROVE SUPERVISOR REQUEST BY MANAGER
export const postApproveRequest = (formData, toast) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(getToken()).then(token => {
      // console.log(token);
      axios
        .post(`${API_URL}post/approve/supervisor/month/plan/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          if (res.status === 201 || res.status === 200) {
            dispatch(uiStopLoading());
            dispatch(setReload());
            console.log('data', res.data);
            toast.show({
              description: `تم اعتماد الخطة بنجاح`,
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
              'حدث خطأ أثناء عملية اعتماد الخطة',
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

export const setPlanApproveModal = planApproveModal => {
  return {
    type: SET_PLAN_APPROVE_MODAL,
    planApproveModal: planApproveModal,
  };
};

export const setPlanDetailsDate = planDetailsDate => {
  return {
    type: SET_PLAN_DETAILS_DATE,
    planDetailsDate: planDetailsDate,
  };
};

export const setMonthPlanId = monthPlanId => {
  return {
    type: SET_MONTH_PLAN_ID,
    monthPlanId: monthPlanId,
  };
};

export const setSelectedDate = selectedDate => {
  return {
    type: SET_SELECTED_DATE,
    selectedDate: selectedDate,
  };
};
