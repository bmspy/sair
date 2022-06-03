import {CREATE_NOTE, SET_NOTES, SET_NOTE, SET_NOTE_DATE} from './ActionTypes';

import AsyncStorage from '@react-native-community/async-storage';

import {Alert} from 'react-native';

import axios from 'axios';

import {API_URL} from '@env';

import {uiStartLoading, uiStopLoading} from './UI';
import {getToken} from './UserActions';

export const postCreateNote = (formData, navigateToTarget, toast) => {
  return dispatch => {
    dispatch(uiStartLoading());
    dispatch(getToken()).then(token => {
      // console.log(token);
      axios
        .post(`${API_URL}post/note/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${token}`,
          },
        })
        .then(res => {
          dispatch(uiStopLoading());
          console.log('RES: ', res);
          if (res.status === 201 || res.status === 200) {
            navigateToTarget('Home');
            toast.show({
              description: 'تمت إضافة الملاحظة بنجاح',
            });
          }
        })
        .catch(error => {
          console.log('error: ', error);
          dispatch(uiStopLoading());
          if (error.response) {
            // console.log(error.response.data);
            // Object.keys(error.response.data).forEach((item, idx) =>
            //   console.log(`${item}: ${error.response.data[item]}`),
            // );
            const errorLog = Object.keys(error.response.data).map(
              (item, idx) => `${item}: ${error.response.data[item]}`,
            );
            // console.log(errorLog);
            Alert.alert(
              'حدث خطأ أثناء عملية إضافة الملاحظة',
              errorLog.map(item => `${item}`).join('\n'),
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

export const setNote = note => {
  return {
    type: SET_NOTE,
    note: note,
  };
};

export const setNotes = notes => {
  return {
    type: SET_NOTES,
    notes: notes,
  };
};

export const setNoteDate = noteDate => {
  return {
    type: SET_NOTE_DATE,
    noteDate: noteDate,
  };
};
