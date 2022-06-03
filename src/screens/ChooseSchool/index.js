import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Icon} from '../../components';
import {colors, images} from '../../config';
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
  Divider,
  useToast,
} from 'native-base';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScrollPicker from 'react-native-scroll-picker-wheel';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {postPlanDone, setPlanDoneModal} from '../../redux/actions/Index';
import {API_URL} from '@env';


const ChooseSchool = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [stateSchool, setStateSchool] = useState([]);
  const [newDestination, setNewDestination] = useState(props.placeData?.destinationList[0]?.id);

   // GET STATE SCHOOL
   useEffect(() => {
    const getStateSchool = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(
        `${API_URL}get/state/schools/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      setStateSchool(response.data);
    };

    getStateSchool();
  }, []);

  const handlePlanDone = () => {
    // console.log(destination);
    // console.log(done);
    // props.onUiStartLoading();
    const formData = new FormData();
    formData.append('destination', props.placeData.destination);
    formData.append('done', props.placeData.done);
    formData.append('new_destination_type', props.placeData.new_destination_type);
    formData.append('new_destination_id', newDestination);
    console.log(formData);
    props.onPostPlanDone(formData, toast, props.placeData.done);
    // const token = await AsyncStorage.getItem('id_token');
    // const response = await axios.post(
    //   'http://sair.ghaith.om/post/plan/done/',
    //   formData,
    //   {
    //     headers: {
    //       Authorization: `Token ${token}`,
    //     },
    //   },
    // );
    // console.log(response);
    // setSelectedMonth(selectedMonth);
    // props.onUiStopLoading();
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
          text: 'اختيار اسم المدرسة',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        // rightComponent={{icon: 'home', color: '#000'}}
      />
      {/* <View style={styles.header}>
        <View style={styles.sideHeader}>
          <Pressable onPress={() => navigation.pop()}>
            <Icon type={'material'} size={30} name={'keyboard-arrow-right'} />
          </Pressable>

          <View>
            <Text style={styles.address}>اختيار اسم المدرسة</Text>
          </View>
          <Pressable onPress={() => navigation.openDrawer()}>
          </Pressable>
        </View>
      </View> */}
      <Image style={styles.img} source={images.choose_school} />
      {/* Wheel Picker */}
      <VStack height="140" marginTop={10}>
        <ScrollPicker
          dataSource={props.placeData?.destinationList.map(item => item.name)}
          selectedIndex={0}
          renderItem={(data, index, isSelected) => {
            // console.log(isSelected);
          }}
          onValueChange={(data, selectedIndex) => {
            props.placeData?.destinationList.forEach(item => {
              if (item.name === data) {
                setNewDestination(item.id);
              }
            });
            // console.log('index: ', selectedIndex);
            //
          }}
          wrapperHeight={140}
          wrapperWidth={wp('100%')}
          wrapperBackground={'#FFFFFF'}
          itemHeight={50}
          highlightColor={'#d8d8d8'}
          highlightBorderWidth={2}
          // activeItemColor={'#222121'}
          itemColor={'#B4B4B4'}
        />
      </VStack>
      <Pressable onPress={handlePlanDone} style={styles.btn}>
        <Text style={styles.loginBtn}> اختيار </Text>
      </Pressable>

      <Modal isOpen={props.planDoneModal}>
        <Modal.Content maxWidth="400px" paddingY={7}>
          <VStack space={2}>
            <Text
              style={[
                styles.loginBtn,
                {
                  color: colors.dimGray,
                  marginHorizontal: 45,
                  fontSize: 14,
                  textAlign: 'center',
                  lineHeight: 20,
                },
              ]}>
              تم انشاء خطتك الشهرية بنجاح
            </Text>
            <Icon
              name={'check-circle'}
              type={'material'}
              color={colors.primary}
              size={wp('16%')}
            />
            <HStack justifyContent="center" space={5}>
              {/* Button */}
              <Pressable
                onPress={() => {
                  props.onSetPlanDoneModal(false);
                  navigation.navigate('Home');
                }}
                style={[styles.btn, {width: '70%', marginVertical: '5%'}]}>
                <HStack
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  space={2}>
                  {/* <Icon name={'lock'} type={'material'} size={20} color="#FFF" /> */}
                  <Text style={styles.loginBtn}> عودة للصفحة الرئيسية</Text>
                </HStack>
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  profile: state.user.profile,
  placeData: state.plan.placeData,
  planDoneModal: state.plan.planDoneModal,
});

const mapDispatchToProps = dispatch => ({
  onPostPlanDone: (formData, toast, done) => dispatch(postPlanDone(formData, toast, done)),
  onSetPlanDoneModal: (flag) => dispatch(setPlanDoneModal(flag)),
  // onSetNoteDate: date => dispatch(setNoteDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSchool);
