import React, {Component, useEffect} from 'react';
import {View} from 'react-native';
import {store} from '../../redux/Store';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Initial() {
  const navigation = useNavigation();
  //Set the navigation distinction either to the OnBoarding screen or login or home screen
  const navigationDestination = async () => {
    const loggedIn = !!store.getState().jwt;
    if (loggedIn) {
      //todo get user type and set current user type
      const userType = store.getState().user.type;
      navigation.navigate('MyDrawer', {type: 'supervisor'});
    }

    const firstStart = await AsyncStorage.getItem('firstStart');

    if (firstStart === null) {
      await AsyncStorage.setItem('firstStart', 'false');
      navigation.navigate('OnBoarding');
    } else {
      navigation.navigate('SignIn');
    }
  };

  useEffect(() => {
    navigationDestination();
  });
  return <View />;
}
