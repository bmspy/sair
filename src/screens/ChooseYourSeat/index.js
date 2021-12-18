import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {Icon} from '../../components';
import {colors, images} from '../../config';
import CompleteSeats from './CompleteSeats';
import styles from './styles';
import {Tab, TabView, FAB, Header} from 'react-native-elements';
import {
  VStack,
  HStack,
  Modal,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
  Button,
  useToast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import ImageMapper from '../../services/index';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {createPlan} from '../../redux/actions/Index';
import {API_URL} from '@env';

const ChooseYourSeat = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [carDetails, setCarDetails] = useState({});
  const [usedSeats, setUsedSeats] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  // const [fourSeats, setFourSeats] = useState([
  //   {
  //     id: '0',
  //     name: '1',
  //     shape: 'rectangle',
  //     width: 25,
  //     height: 40,
  //     x1: 35,
  //     y1: 135,
  //     prefill: usedSeats.includes(1) ? colors.discountRed : colors.altoGray,
  //     fill: colors.primary,
  //   },
  //   {
  //     id: '1',
  //     name: '2',
  //     shape: 'rectangle',
  //     width: 25,
  //     height: 40,
  //     x1: 35,
  //     y1: 200,
  //     prefill: usedSeats.includes(2) ? colors.discountRed : colors.altoGray,
  //     fill: colors.primary,
  //   },
  //   {
  //     id: '2',
  //     name: '3',
  //     shape: 'rectangle',
  //     width: 25,
  //     height: 40,
  //     x1: 65,
  //     y1: 200,
  //     prefill: usedSeats.includes(3) ? colors.discountRed : colors.altoGray,
  //     fill: colors.primary,
  //   },
  //   {
  //     id: '3',
  //     name: '4',
  //     shape: 'rectangle',
  //     width: 25,
  //     height: 40,
  //     x1: 95,
  //     y1: 200,
  //     prefill: usedSeats.includes(4) ? colors.discountRed : colors.altoGray,
  //     fill: colors.primary,
  //   },
  // ]);

  const fourSeats = [
    {
      id: '0',
      name: '1',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 35,
      y1: 135,
      prefill: usedSeats.includes(1) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '1',
      name: '2',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 35,
      y1: 200,
      prefill: usedSeats.includes(2) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '2',
      name: '3',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 65,
      y1: 200,
      prefill: usedSeats.includes(3) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '3',
      name: '4',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 95,
      y1: 200,
      prefill: usedSeats.includes(4) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
  ];
  const sevenSeats = [
    {
      id: '0',
      name: '1',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 35,
      y1: 135,
      prefill: usedSeats.includes(1) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '1',
      name: '2',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 35,
      y1: 185,
      prefill: usedSeats.includes(2) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '2',
      name: '3',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 65,
      y1: 185,
      prefill: usedSeats.includes(3) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '3',
      name: '4',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 95,
      y1: 185,
      prefill: usedSeats.includes(4) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '4',
      name: '5',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 35,
      y1: 235,
      prefill: usedSeats.includes(5) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '5',
      name: '6',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 65,
      y1: 235,
      prefill: usedSeats.includes(6) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
    {
      id: '6',
      name: '7',
      shape: 'rectangle',
      width: 25,
      height: 40,
      x1: 95,
      y1: 235,
      prefill: usedSeats.includes(7) ? colors.discountRed : colors.altoGray,
      fill: colors.primary,
    },
  ];

  useEffect(() => {
    // console.log(props.plan.destination);
    const getCarDetails = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(
        `${API_URL}get/car/details/`,
        {
          params: {
            date: props.plan.date,
            school: props.plan.destination,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response.data.car_details);
      setCarDetails(response.data.car_details);
      setUsedSeats(response.data.car_details.used_seats);
    };

    getCarDetails();
  }, []);

  const onAnyAreaPress = (item, idx, event) => {
    // const taken = [0, 1, 2];
    // console.log(item);
    console.log(usedSeats.includes(Number(item.name)));
    const isUsed = usedSeats.includes(Number(item.name));

    if (isUsed) {
      alert('نأسف ، تم حجز هذا المقعد مسبقا');
    } else {
      if (item.id === selectedAreaId) {
        setSelectedAreaId(null);
      } else {
        setSelectedAreaId(item.id);
      }
    }
    // usedSeats.forEach(res => {
    //   if (res == item.name) {
    //     alert('نأسف ، تم حجز هذا المقعد مسبقا');
    //   } else {
    //     if (item.id === selectedAreaId) {
    //       setSelectedAreaId(null);
    //     } else {
    //       setSelectedAreaId(item.id);
    //     }
    //   }
    // });
    // if (item.id === selectedAreaId) {
    //   setSelectedAreaId(null);
    // } else {
    //   setSelectedAreaId(item.id);
    // }
  };

  // PHONE CALL FUNCTION
  // const callNumber = phone => {
  //   console.log('callNumber ----> ', phone);
  //   let phoneNumber = phone;
  //   if (Platform.OS !== 'android') {
  //     phoneNumber = `telprompt:${phone}`;
  //   } else {
  //     phoneNumber = `tel:${phone}`;
  //   }
  //   Linking.canOpenURL(phoneNumber)
  //     .then(supported => {
  //       if (!supported) {
  //         Alert.alert('Phone number is not available');
  //       } else {
  //         return Linking.openURL(phoneNumber);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleCreatePlan = () => {
    onClose();
    const formData = new FormData();
    formData.append('date', props.plan.date);
    formData.append('destination_type', props.plan.destination_type);
    formData.append('destination', props.plan.destination);
    formData.append('go_method', props.plan.go_method);
    formData.append('car', carDetails?.id);
    if (selectedAreaId) {
      formData.append('car_seat', selectedAreaId);
      props.onCreatePlan(formData, navigation.navigate, toast);
    } else {
      alert('الرجاء اختيار مقعد قبل التأكيد');
    }
    // console.log(format(selectedDay, 'yyyy-MM-dd'));
    // navigation.navigate('SchoolRoute');
  };

  return (
    <SafeAreaView
      style={{backgroundColor: '#FFF', width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        //   containerStyle={{justifyContent: 'flex-end'}}
        backgroundColor="#FFF"
        leftComponent={{
          icon: 'keyboard-arrow-right',
          color: '#000',
          type: 'material',
          size: 30,
          onPress: () => navigation.goBack(),
          //   iconStyle: {color: '#000'},
        }}
        centerComponent={{
          text: 'اختر مقعدك',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        // rightComponent={{icon: 'home', color: '#000'}}
      />
      <ImageMapper
        imgHeight={300}
        imgWidth={160}
        imgSource={images.car_img_new}
        // imgMap={carTest}
        imgMap={carDetails?.seats_number === 4 ? fourSeats : sevenSeats}
        onPress={(item, idx, event) => onAnyAreaPress(item, idx, event)}
        containerStyle={styles.content}
        selectedAreaId={selectedAreaId}
      />
      {/* <Image style={styles.content} source={images.car_img} /> */}
      <View style={styles.driverView}>
        <HStack alignItems="center" space={2}>
          <Image style={styles.img} source={images.avatar_new} />
          <Text style={[styles.address, {height: null}]}>
            {carDetails?.driver_details?.full_name}
          </Text>
        </HStack>
        <Pressable onPress={onOpen} style={styles.driver_btn}>
          <Text style={styles.driver_txt}>بيانات السائق</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: '90%',
          borderBottomColor: colors.primary,
          borderBottomWidth: 1,
          marginTop: 15,
        }}
      />
      <View style={styles.dateView}>
        <Text style={styles.date}>
          {format(new Date(props.plan.date), 'eeee dd MMM , yyyy', {
            locale: ar,
          })}
        </Text>
        {/* <Text style={styles.date}>الأربعاء 7 أكتوبر , 2021</Text> */}
        <Text style={styles.school}>مدرسة: {props.plan.schoolName} </Text>
        {/* <Text style={styles.school}>مدرسة: وادي الحيول</Text> */}
      </View>
      <View style={[styles.dateView, {width: '60%'}]}>
        <Pressable
          onPress={handleCreatePlan}
          style={[styles.driver_btn, {width: 100}]}>
          <Text style={styles.driver_txt}>تأكيد التنفيذ'</Text>
        </Pressable>
        <Pressable
          //   onPress={() => this.props.onRequestCChoose('الغاء')}
          style={[
            styles.driver_btn,
            {backgroundColor: colors.red, width: 100},
          ]}>
          <Text style={styles.driver_txt}>الغاء</Text>
        </Pressable>
      </View>
      {/* <Button onPress={() => console.log(props.plan)}>test</Button> */}
      {/* <CompleteSeats
        onRequestCChoose={item => {
          this.setState({visible: false});
          this.props.navigation.navigate('ChooseYourSeat');
        }}
        visible={this.state.visible}
        onRequestClose={() => this.setState({visible: false})}
      /> */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack width="100%" space={2}>
            <VStack space={5}>
              <Text style={[styles.address, {height: null}]}>
                {' '}
                بيانات السائق{' '}
              </Text>
              <Avatar
                bg="cyan.500"
                alignSelf="center"
                size="lg"
                source={images.avatar_new}
              />
            </VStack>
            <VStack style={{width: '100%', alignItems: 'center'}} space={3}>
              <HStack
                style={{
                  backgroundColor: '#F0F0F0',
                  width: '80%',
                  padding: 15,
                  borderRadius: 20,
                }}>
                <Text
                  style={[
                    styles.address,
                    {height: null, fontWeight: 'normal'},
                  ]}>
                  الاسم : {carDetails?.driver_details?.full_name}
                </Text>
              </HStack>
              <HStack
                style={{
                  backgroundColor: '#F0F0F0',
                  width: '80%',
                  padding: 15,
                  borderRadius: 20,
                }}>
                <Text
                  style={[
                    styles.address,
                    {height: null, fontWeight: 'normal'},
                  ]}>
                  العمر : {carDetails?.driver_details?.age} سنة
                </Text>
              </HStack>
              <HStack
                style={{
                  backgroundColor: '#F0F0F0',
                  width: '80%',
                  padding: 15,
                  borderRadius: 20,
                }}>
                <Text
                  style={[
                    styles.address,
                    {height: null, fontWeight: 'normal'},
                  ]}>
                  رقم السيارة : {carDetails?.plate_number}
                </Text>
              </HStack>
              <HStack style={{justifyContent: 'space-between', width: '80%'}}>
                <Pressable
                  style={{
                    backgroundColor: 'rgba(16, 177, 177, 0.35)',
                    width: '47%',
                    padding: 15,
                    borderRadius: 20,
                  }}
                  onPress={() =>
                    Linking.openURL(
                      `tel:${carDetails?.driver_details?.mobile_for_call}`,
                    )
                  }>
                  <HStack space={2}>
                    <Text
                      style={[
                        styles.address,
                        {height: null, fontWeight: 'normal'},
                      ]}>
                      {carDetails?.driver_details?.mobile_for_call}
                    </Text>
                    <Icon
                      name={'phone'}
                      type={'font-awesome'}
                      size={25}
                      color={'blue'}
                    />
                  </HStack>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: 'rgba(16, 177, 177, 0.35)',
                    width: '47%',
                    padding: 15,
                    borderRadius: 20,
                  }}
                  onPress={() =>
                    // Linking.openURL(`whatsapp://send?text=hello&phone=${carDetails?.driver_details?.mobile_for_whatsapp}`)
                    Linking.openURL(`https://wa.me/${carDetails?.driver_details?.mobile_for_whatsapp}`)
                  }>
                  <HStack
                    space={2}
                   >
                    <Text
                      style={[
                        styles.address,
                        {height: null, fontWeight: 'normal'},
                      ]}>
                      {carDetails?.driver_details?.mobile_for_whatsapp}
                    </Text>
                    <Icon
                      name={'whatsapp'}
                      type={'font-awesome'}
                      size={25}
                      color={'green'}
                    />
                  </HStack>
                </Pressable>
              </HStack>
            </VStack>
            <Pressable
              onPress={handleCreatePlan}
              style={styles.btn}>
              <Text style={styles.loginBtn}> تأكيد </Text>
            </Pressable>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  plan: state.plan.plan,
});

const mapDispatchToProps = dispatch => ({
  onCreatePlan: (plan, navigateToTarget, toast) => dispatch(createPlan(plan, navigateToTarget, toast)),
  // onSetPlan: (plan) => dispatch(setPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseYourSeat);
