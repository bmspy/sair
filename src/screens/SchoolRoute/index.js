import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Icon} from '../../components';
import {colors, images} from '../../config';
import styles from './styles';
import {Tab, TabView, Card, Header} from 'react-native-elements';
import {
  VStack,
  HStack,
  Modal,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {borderRadius} from 'styled-system';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  Callout,
} from 'react-native-maps';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {connect} from 'react-redux';
import {} from '../../redux/actions/Index';

const directorateCoords = {
  latitude: 24.236777,
  longitude: 55.780852,
};

const SchoolRoute = props => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [viewCoordinate, setViewCoordinate] = useState({
    latitude: 24.2505644,
    longitude: 55.7582294,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  return (
    <View style={{width: '100%', height: '100%', flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={{flex: 1}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          // initialRegion={viewCoordinate}
          initialRegion={{
            latitude: parseFloat(
              (directorateCoords.latitude + Number(props.plan?.destination_details?.latitude)) / 2,
            ),
            longitude: parseFloat(
              (directorateCoords.longitude + Number(props.plan?.destination_details?.longitude)) / 2,
            ),
            latitudeDelta:
              Math.abs(
                directorateCoords.latitude - Number(props.plan?.destination_details?.latitude),
              ) * 2,
            longitudeDelta:
              Math.abs(
                directorateCoords.longitude - Number(props.plan?.destination_details?.longitude),
              ) * 2,
          }}
          //   region={viewCoordinate}
        >
          <Marker
            title='مديرية التربية و التعليم'
            coordinate={{
              latitude: parseFloat(directorateCoords.latitude),
              longitude: parseFloat(directorateCoords.longitude),
            }}>
            {/* <DestinationMark width={30} height={30} /> */}
            {/* <Image source={images.school_new} /> */}
            <Icon name="office-building" type='material-community' size={35} color={colors.primary} />
          </Marker>

          <Marker
            title={'مدرسة ' + props.plan?.destination_details?.name}
            coordinate={{
              latitude: parseFloat(Number(props.plan?.destination_details?.latitude)),
              longitude: parseFloat(Number(props.plan?.destination_details?.longitude)),
            }}>
            <Image source={images.school_new} />
          </Marker>

          <Polyline
            coordinates={[
              {latitude: directorateCoords.latitude, longitude: directorateCoords.longitude},
              {latitude: Number(props.plan?.destination_details?.latitude), longitude: Number(props.plan?.destination_details?.longitude)},
            ]}
            strokeColor={colors.primary} // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              colors.primary,
            ]}
            strokeWidth={6}
          />
        </MapView>
        {/* <HStack
          style={{
            position: 'absolute',
            top: 100,
            left: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="keyboard-arrow-right"
              color="#000"
              type="material"
              size={30}
            />
          </Pressable>
          <Text style={styles.address1}>الذهاب بسيارتك الخاصة</Text>
        </HStack> */}
        <VStack
          style={{
            height: hp('33%'),
            width: '100%',
            backgroundColor: colors.primary,
          }}>
          <HStack
            style={{
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              backgroundColor: colors.primary,
              height: 10,
              bottom: 10,
            }}
          />
          <HStack style={{backgroundColor: colors.primary, marginBottom: 15}}>
            <Text
              style={[
                styles.address1,
                {color: colors.white, paddingHorizontal: 10},
              ]}>
              استعراض خريطة المدرسة
            </Text>
          </HStack>
          <VStack
            style={{
              backgroundColor: colors.white,
              flex: 1,
              paddingHorizontal: 25,
              paddingTop: 10,
            }}>
            <HStack justifyContent="flex-start">
              <Avatar size="sm" source={{uri: props.profile.image}} />
              <HStack>
                <VStack>
                  <Text
                    style={[
                      styles.address1,
                      {color: colors.dimGray, textAlign: 'left', fontSize: 16},
                    ]}>
                    مدرسة {props.plan?.destination_details?.name} /{props.plan?.go_method === 'own_car' ? 'بسيارتك الخاصة' : 'مع سائق'}
                  </Text>
                  <Text
                    style={[
                      styles.address1,
                      {color: colors.dimGray, textAlign: 'left'},
                    ]}>
                    {format(new Date(props.plan?.date), 'eeee dd MMM , yyyy', {locale: ar})}
                  </Text>
                  <HStack>
                    <Icon
                      name="clock"
                      type="feather"
                      size={13}
                      color={colors.dimGray}
                    />
                    <Text
                      style={[
                        styles.address1,
                        {color: colors.dimGray, textAlign: 'left'},
                      ]}>
                      الوقت المتوقع للوصول {props.plan?.destination_details?.arrival_time} 
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </HStack>
            <Pressable onPress={() => navigation.navigate('AddPlane')} style={styles.btn}>
              <Text style={styles.loginBtn}> عودة إلى ادخال الخطة </Text>
            </Pressable>
          </VStack>
        </VStack>
      </View>
    </View>
  );
};


const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  plan: state.plan.plan,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  // onSetNoteDate: date => dispatch(setNoteDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolRoute);
