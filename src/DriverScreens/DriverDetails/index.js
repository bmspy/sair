import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  ImageBackground,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {colors, images} from '../../config';
import styles from './styles';
import {Icon} from '../../components';
import {FAB, Header, SearchBar} from 'react-native-elements';
import {
  VStack,
  HStack,
  Modal,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
  useToast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {putEditProfile} from '../../redux/actions/Index';
import {
  format,
  subDays,
  isThisMonth,
  eachWeekendOfMonth,
  addMonths,
  getMonth,
  setHours,
  differenceInCalendarDays,
  isFirstDayOfMonth,
  lastDayOfMonth,
} from 'date-fns';
import {ar} from 'date-fns/locale';
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Callout,
} from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const DriverDetails = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [viewCoordinate, setViewCoordinate] = useState({
    latitude: 24.2505644,
    longitude: 55.7582294,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const renderSupervisors = ({item}) => (
    <HStack style={{alignItems: 'center'}}>
      <Image
        source={images.avatar_new}
        style={{
          width: wp('10%'),
          height: wp('10%'),
          borderWidth: 2,
          borderColor: colors.primary,
          borderRadius: wp('10%'),
        }}
      />
      <Text style={[styles.address3]}>مشرف 1</Text>
    </HStack>
  );

  return (
    <SafeAreaView
      style={{backgroundColor: '#F2F2F2', width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        containerStyle={{width: '90%', alignSelf: 'center'}}
        backgroundColor="#F2F2F2"
        // leftComponent={
        //   <Pressable onPress={() => navigation.openDrawer()}>
        //     <Image source={images.menuBar} />
        //   </Pressable>
        // }
        leftComponent={{
          icon: 'keyboard-arrow-right',
          color: '#000',
          type: 'material',
          size: 30,
          onPress: () => navigation.goBack(),
          //   iconStyle: {color: '#000'},
        }}
        centerComponent={{
          text: 'التفاصيل',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        // rightComponent={<Avatar source={images.avatar_new} size="sm" />}
      />
      <VStack
        style={{
          width: '90%',
          alignSelf: 'center',
          borderWidth: 2,
          borderColor: colors.primary,
          borderRadius: 10,
          backgroundColor: colors.white,
          marginVertical: 20,
          padding: 10,
        }}>
        <HStack>
          <Text
            style={[
              styles.address3,
              {textAlign: 'center', color: colors.primary},
            ]}>
            اليوم:
          </Text>
          <Text style={[styles.address3, {marginHorizontal: null}]}>
            {format(new Date(), 'eeee  dd MMM yyyy', {locale: ar})}
          </Text>
        </HStack>
        <HStack>
          <Text
            style={[
              styles.address3,
              {textAlign: 'center', color: colors.primary},
            ]}>
            خطتك اليوم:
          </Text>
          <Text style={[styles.address3, {marginHorizontal: null}]}>
            مدرسة الطلائع
          </Text>
        </HStack>
      </VStack>
      <View style={{height: '40%', width: '90%', alignSelf: 'center'}}>
        <MapView
          // showsUserLocation={true}
          followsUserLocation={true}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={viewCoordinate}
          //   region={viewCoordinate}
        />
      </View>
      <Text
        style={[
          styles.address3,
          {fontSize: 17, color: colors.black, marginTop: 10},
        ]}>
        المشرفين
      </Text>
      <VStack
        style={{
          width: '90%',
          flex: 1,
          alignSelf: 'center',
          backgroundColor: colors.white,
          borderRadius: 10,
          // paddingTop: 10,
          marginVertical: 15,
        }}>
        <FlatList
          data={[{}, {}, {}, {}, {}, {}, {}]}
          renderItem={renderSupervisors}
          scrollEnabled
          numColumns={2}
          columnWrapperStyle={{paddingVertical: 10, justifyContent: 'space-evenly'}}
        />
      </VStack>
      {/* <VStack
        style={{
          width: '90%',
          alignSelf: 'center',
          backgroundColor: colors.white,
          borderRadius: 10,
          padding: 20,
        }}>
        <HStack style={{justifyContent: 'space-evenly'}}>
          <HStack alignItems="center">
            <Image
              source={images.avatar_new}
              style={{
                width: wp('10%'),
                height: wp('10%'),
                borderWidth: 2,
                borderColor: colors.primary,
                borderRadius: wp('10%'),
              }}
            />
            <Text style={[styles.address3]}>مشرف 1</Text>
          </HStack>
          <HStack alignItems="center">
            <Image
              source={images.avatar_new}
              style={{
                width: wp('10%'),
                height: wp('10%'),
                borderWidth: 2,
                borderColor: colors.primary,
                borderRadius: wp('10%'),
              }}
            />
            <Text style={[styles.address3]}>مشرف 1</Text>
          </HStack>
        </HStack>
      </VStack> */}
      {/* <Pressable style={[styles.btn]}>
        <Text style={styles.loginBtn}> عرض الخطة </Text>
      </Pressable> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  // onPutEditProfile: (formData, navigateToTarget, regToast) => dispatch(putEditProfile(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverDetails);
