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
import {API_URL} from '@env';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const directorateCoords = {
  latitude: 24.236777,
  longitude: 55.780852,
};

const DriverDetails = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [dayPlan, setDayPlan] = useState({});

  const [viewCoordinate, setViewCoordinate] = useState({
    latitude: parseFloat(dayPlan?.latitude),
    longitude: parseFloat(dayPlan?.longitude),
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [viewCoordinate1, setViewCoordinate1] = useState({
    latitude: 24.2509644,
    longitude: 55.7522294,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  // const [viewCoordinate2, setViewCoordinate2] = useState({
  //   latitude: 24.2501644,
  //   longitude: 55.7285294,
  //   latitudeDelta: 0.0322,
  //   longitudeDelta: 0.0221,
  // });

  useEffect(() => {
    setIsLoading(true);
    const getPlanDetails = async () => {
      const token = await AsyncStorage.getItem('id_token');
      try {
        const response = await axios.get(
          `${API_URL}get/driver/destination/plan/`,
          {
            params: {
              date: props.selectedDate,
              school: props.monthPlanId,
            },
            headers: {
              Authorization: `Token ${token}`,
            },
          },
        );
        setIsLoading(false);
        setDayPlan(response.data.destination);
        console.log(response.data.destination);
      } catch (error) {
        console.log(error);
      }
    };

    getPlanDetails();
  }, []);

  const renderSupervisors = ({item}) => (
    <HStack
      style={{
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={{uri: item.image}}
        style={{
          width: wp('10%'),
          height: wp('10%'),
          borderWidth: 2,
          borderColor: colors.primary,
          borderRadius: wp('10%'),
        }}
      />
      <Text style={[styles.address3, {width: '40%'}]}>{item.full_name}</Text>
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
            {format(new Date(props.selectedDate), 'eeee  dd MMM yyyy', {
              locale: ar,
            })}
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
          <Text
            numberOfLines={1}
            style={[styles.address3, {marginHorizontal: null, width: '65%'}]}>
            {Object.keys(dayPlan)?.length ? dayPlan?.name : 'لا يوجد'}
          </Text>
        </HStack>
      </VStack>
      <View style={{height: '40%', width: '90%', alignSelf: 'center'}}>
        {Object.keys(dayPlan)?.length ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            // initialRegion={{
            //   latitude: parseFloat(dayPlan?.latitude),
            //   longitude: parseFloat(dayPlan?.longitude),
            //   latitudeDelta: 0.0322,
            //   longitudeDelta: 0.0221,
            // }}
            initialRegion={{
              latitude: parseFloat(
                (directorateCoords.latitude + Number(dayPlan?.latitude)) / 2,
              ),
              longitude: parseFloat(
                (directorateCoords.longitude + Number(dayPlan?.longitude)) / 2,
              ),
              latitudeDelta:
                Math.abs(
                  directorateCoords.latitude - Number(dayPlan?.latitude),
                ) * 2,
              longitudeDelta:
                Math.abs(
                  directorateCoords.longitude - Number(dayPlan?.longitude),
                ) * 2,
            }}
            //   region={viewCoordinate}
          >
            <Marker
              title="مديرية التربية و التعليم"
              coordinate={{
                latitude: parseFloat(directorateCoords.latitude),
                longitude: parseFloat(directorateCoords.longitude),
              }}>
              {/* <DestinationMark width={30} height={30} /> */}
              {/* <Image source={images.school_new} /> */}
              <Icon
                name="office-building"
                type="material-community"
                size={35}
                color={colors.primary}
              />
            </Marker>

            <Marker
              title={'مدرسة ' + props.plan?.destination_details?.name}
              coordinate={{
                latitude: parseFloat(Number(dayPlan?.latitude)),
                longitude: parseFloat(Number(dayPlan?.longitude)),
              }}>
              <Image source={images.school_new} />
            </Marker>

            <Polyline
              coordinates={[
                {
                  latitude: directorateCoords.latitude,
                  longitude: directorateCoords.longitude,
                },
                {
                  latitude: Number(dayPlan?.latitude),
                  longitude: Number(dayPlan?.longitude),
                },
              ]}
              strokeColor={colors.primary} // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[colors.primary]}
              strokeWidth={6}
            />

            {/* <Marker
              title={dayPlan?.name}
              coordinate={{
                latitude: parseFloat(dayPlan?.latitude),
                longitude: parseFloat(dayPlan?.longitude),
              }}>
              <Image source={images.school_new} />
            </Marker> */}
          </MapView>
        ) : null}
        {/* <Marker
            title="مديرية التربية و التعليم"
            coordinate={{
              latitude: parseFloat(viewCoordinate.latitude),
              longitude: parseFloat(viewCoordinate.longitude),
            }}>
            <Icon
              name="office-building"
              type="material-community"
              size={35}
              color={colors.primary}
            />
          </Marker> */}

        {/* <Marker
            title={'مدرسة ' + viewCoordinate1.name}
            coordinate={{
              latitude: parseFloat(Number(viewCoordinate1.latitude)),
              longitude: parseFloat(Number(viewCoordinate1.longitude)),
            }}>
            <Image source={images.school_new} />
          </Marker> */}

        {/* <Marker
            title={'مدرسة ' + viewCoordinate2.name}
            coordinate={{
              latitude: parseFloat(Number(viewCoordinate2.latitude)),
              longitude: parseFloat(Number(viewCoordinate2.longitude)),
            }}>
            <Image source={images.school_new} />
          </Marker> */}
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
        {dayPlan?.passengers?.length ? (
          <FlatList
            data={dayPlan?.passengers}
            renderItem={renderSupervisors}
            scrollEnabled
            numColumns={2}
            columnWrapperStyle={{
              paddingVertical: 10,
              justifyContent: 'space-evenly',
            }}
          />
        ) : (
          <Box
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text
              style={[
                styles.loginBtn,
                {
                  color: colors.dimGray,
                  marginHorizontal: 5,
                  fontSize: 14,
                  textAlign: 'center',
                },
              ]}>
              لا يوجد مشرفين
            </Text>
          </Box>
        )}
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
  selectedDate: state.plan.selectedDate,
  monthPlanId: state.plan.monthPlanId,
});

const mapDispatchToProps = dispatch => ({
  // onPutEditProfile: (formData, navigateToTarget, regToast) => dispatch(putEditProfile(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverDetails);
