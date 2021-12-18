import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {configureStore} from '../../redux/configureStore';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {getProfile} from '../../redux/actions/Index';

const Initial = props => {
  const navigation = useNavigation();
  //Set the navigation distinction either to the OnBoarding screen or login or home screen
  const navigationDestination = async () => {
    //Old Code
    // const loggedIn = !!configureStore.getState().jwt;
    // if (loggedIn) {
    //   //todo get user type and set current user type
    //   const userType = configureStore.getState().user.type;
    //   navigation.navigate('MyDrawer', {type: 'supervisor'});
    // }
    // const jwt = await AsyncStorage.getItem('id_token');
    // if (jwt === null) {
    //   navigation.navigate('SignIn');
    // } else {
    //   navigation.navigate('HowWillGo');
    // }

    const firstStart = await AsyncStorage.getItem('firstStart');
    const token = await AsyncStorage.getItem('id_token');

    if (firstStart === null) {
      await AsyncStorage.setItem('firstStart', 'false');
      navigation.navigate('OnBoarding');
    } else {
      if (token === null) {
        navigation.navigate('SignIn');
      } else {
        props.onGetProfile(token, navigation.navigate);
      }
      // const jwt = await AsyncStorage.getItem('id_token');
      // if (jwt === null) {
      //   navigation.navigate('SignIn');
      // } else {
      //   props.onGetProfile(jwt);
      //   navigation.navigate('HowWillGo');
      // }
      // navigation.navigate('SignIn');
    }
  };

  useEffect(() => {
    navigationDestination();
  }, []);
  return <View />;
  // return <View><Text>sdad</Text></View>;
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
});

const mapDispatchToProps = dispatch => ({
  onGetProfile: (token, navigateToTarget) => dispatch(getProfile(token, navigateToTarget)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Initial);
