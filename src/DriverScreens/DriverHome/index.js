import React, {useState, useEffect, useCallback} from 'react';
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
  Alert,
  BackHandler,
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
  Radio,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setSelectedDate, setMonthPlanId} from '../../redux/actions/Index';
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
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  handlePreviousDays,
  arabicMonths,
  dotColors,
} from '../../services/calendar';
import {API_URL} from '@env';
import {useFocusEffect} from '@react-navigation/native';

const DriverHome = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [monthIndex, setMonthIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [schoolId, setSchoolId] = useState(null);

  //CALENDAR
  const [selectedDay, setSelectedDay] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [selectedDayToSave, setSelectedDayToSave] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [previousDays, setPreviousDays] = useState({});
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'MM'));
  const [currentYear, setCurrentYear] = useState(format(new Date(), 'yyyy'));
  const [daysoff, setDaysoff] = useState([]);

  // CALENDAR DAY DOTS COLOR
  const schools1 = dotColors.schools1;
  const schools2 = dotColors.schools2;
  const others1 = dotColors.others1;
  const others2 = dotColors.others2;
  const holiday1 = dotColors.holiday1;
  const holiday2 = dotColors.holiday2;

  LocaleConfig.locales.ar = arabicMonths;
  LocaleConfig.defaultLocale = 'ar';

  useFocusEffect(
    useCallback(() => {
      const handleBack = () => {
        Alert.alert(
          'الخروج من التطبيق',
          'هل تريد بالتأكيد الخروج من التطبيق؟',
          [
            {
              text: 'إلغاء',
              style: 'cancel',
            },
            {
              text: 'تأكيد الخروج',
              onPress: () => BackHandler.exitApp(),
            },
          ],
        );

        return true;
      };

      const unsubscribe = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBack,
      );

      return () => unsubscribe.remove();
    }, []),
  );

  useEffect(() => {
    setIsLoading(true);
    const getPlanDetails = async () => {
      const token = await AsyncStorage.getItem('id_token');
      try {
        const response = await axios.get(`${API_URL}get/driver/day/plan/`, {
          params: {
            date: selectedDay,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setIsLoading(false);
        setSchools(response.data.destinations);
        console.log(response.data.destinations);
      } catch (error) {
        console.log(error);
      }
    };

    getPlanDetails();
  }, [selectedDay]);

  // GET DAYSOFF
  // useEffect(() => {
  //   // console.log(props.plan.destination);
  //   const getDaysoff = async () => {
  //     const token = await AsyncStorage.getItem('id_token');
  //     const response = await axios.get(
  //       `${API_URL}get/month/daysoff/`,
  //       {
  //         params: {
  //           month: currentMonth,
  //           year: currentYear,
  //         },
  //         headers: {
  //           Authorization: `Token ${token}`,
  //         },
  //       },
  //     );
  //     console.log(response.data.map(item => item.date));
  //     setDaysoff(response.data.map(item => item.date));

  //     response.data
  //       .map(item => item.date)
  //       .forEach(item => {
  //         setPreviousDays(prev => {
  //           return {
  //             ...prev,
  //             [item]: {
  //               disabled: true,
  //               disableTouchEvent: true,
  //               dots: [holiday1, holiday2],
  //             },
  //           };
  //         });
  //       });
  //   };

  //   getDaysoff();
  // }, [currentMonth, currentYear]);

  // HANDLE SELECTED DAY
  const handleSelectDate = date => {
    // props.onCheckSelectedDate(new Date(date.dateString));
    setSelectedDay(date.dateString);
    // bs.current.snapTo(0);
    console.log(date.dateString);
  };

  // const renderMonths = ({item}) => (
  //   <Pressable
  //     onPress={() => setMonthIndex(item.id - 1)}
  //     style={{
  //       width: wp('15%'),
  //       height: wp('20%'),
  //       backgroundColor:
  //         item.id - 1 === monthIndex ? colors.primary : colors.white,
  //       marginHorizontal: 5,
  //       borderRadius: 10,
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     }}>
  //     <Text
  //       style={[
  //         styles.address3,
  //         {
  //           color: item.id - 1 === monthIndex ? colors.white : colors.primary,
  //           fontSize: 12,
  //         },
  //       ]}>
  //       {item.name}
  //     </Text>
  //   </Pressable>
  // );

  const renderSchools = ({item}) =>
    item?.name ? (
      <Radio style={{alignSelf: 'flex-start'}} value={item.id} my={1}>
        {item.name}
      </Radio>
    ) : null;

  const handleConfirmSchool = () => {
    if (schoolId) {
      setShowModal(false);
      props.onSetSelectedDate(selectedDay);
      props.onSetMonthPlanId(schoolId);
      navigation.navigate('DriverDetails');
    } else {
      alert('الرجاء اختيار مدرسة');
    }
  };

  const handleDayPlan = () => {
    if (schools?.length) {
      setShowModal(true);
      console.log(selectedDay);
    } else {
      alert('لا يوجد خطة في هذا اليوم');
    }
    // props.onSetSelectedDate(selectedDay);
    // navigation.navigate('DriverDetails');
  };

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
        leftComponent={
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image source={images.menuBar} />
          </Pressable>
        }
        // leftComponent={{
        //   icon: 'keyboard-arrow-right',
        //   color: '#000',
        //   type: 'material',
        //   size: 30,
        //   onPress: () => navigation.goBack(),
        //   //   iconStyle: {color: '#000'},
        // }}
        centerComponent={{
          text: `مرحبا ${props.profile.full_name}`,
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        rightComponent={
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Avatar source={{uri: props.profile.image}} size="sm" />
          </Pressable>
        }
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
            {format(new Date(selectedDay), 'eeee  dd MMM yyyy', {locale: ar})}
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
            {schools?.length ? schools[0]?.name : 'لا يوجد'}
          </Text>
        </HStack>
      </VStack>
      <Text style={[styles.address3, {fontSize: 17, color: colors.black}]}>
        خطة السائق
      </Text>
      {/* CALENDAR */}
      <View style={{width: '100%', alignSelf: 'center', marginTop: 20}}>
        <Calendar
          renderArrow={left =>
            left === 'left' ? (
              <Icon
                name={'keyboard-arrow-right'}
                type={'material'}
                color={colors.primary}
              />
            ) : (
              <Icon
                name={'keyboard-arrow-left'}
                type={'material'}
                color={colors.primary}
              />
            )
          }
          // renderArrow={(left, right) => (<Icon name={'keyboard-arrow-right'} type={'material'} color={colors.primary} />)}
          onDayPress={handleSelectDate}
          hideExtraDays={true}
          //   disableArrowLeft={true}
          onMonthChange={date => {
            setSelectedMonth(date.dateString);
            setCurrentMonth(format(new Date(date.dateString), 'MM'));
            setCurrentYear(format(new Date(date.dateString), 'yyyy'));
            // console.log(new Date(date.dateString));
          }}
          onPressArrowLeft={subtractMonth =>
            isThisMonth(new Date(selectedMonth)) ? null : subtractMonth()
          }
          onPressArrowRight={addMonth =>
            getMonth(new Date(selectedMonth)) ===
            getMonth(addMonths(new Date(), 3))
              ? null
              : addMonth()
          }
          markingType={'multi-dot'}
          markedDates={{
            [selectedDay]: {
              selected: true,
              marked: true,
              selectedColor: colors.primary,
            },
            // '2021-12-13': {
            //   dots: [schools1, schools2],
            //   selected: selectedDay === '2021-12-13' ? true : false,
            //   // marked: true,
            //   selectedColor: '#7F05A3',
            // },
            // '2021-12-22': {
            //   dots: [schools1, schools2],
            //   selected: selectedDay === '2021-12-22' ? true : false,
            //   selectedColor: '#7F05A3',
            // },
            // '2021-12-22': {dots: [holiday, holiday]},
            ...previousDays,
          }}
          theme={{
            selectedDayBackgroundColor: 'green',
            todayTextColor: 'green',
            arrowColor: 'green',
          }}
          style={{borderRadius: 7, width: '90%', alignSelf: 'center'}}
        />
      </View>
      <Pressable onPress={handleDayPlan} style={[styles.btn]}>
        <Text style={styles.loginBtn}> خطة اليوم </Text>
      </Pressable>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{alignItems: 'center'}}>
            اختر المدرسة
          </Modal.Header>
          <Modal.Body>
            <Radio.Group
              style={{paddingHorizontal: '10%'}}
              name="myRadioGroup"
              accessibilityLabel="change place"
              // defaultValue={schools?.length ? schools[0]?.id : '0'}
              value={schoolId}
              onChange={nextValue => {
                setSchoolId(nextValue);
                // setChangeType(nextValue.type);
                // console.log(nextValue);
              }}>
              <FlatList
                data={schools}
                keyExtractor={item => item.id}
                renderItem={renderSchools}
              />
              {/* {selectedChangePlan?.destination_list?.forEach(item => (
                <Radio value={item.destination_details?.name} my={1}>
                  {item.destination_details?.name}
                </Radio>
              ))} */}
              {/* <Radio value="مدرسة المجد" my={1}>
                مدرسة المجد
              </Radio> */}
            </Radio.Group>
            <Pressable
              onPress={handleConfirmSchool}
              style={[styles.btn, {width: 220, marginTop: '5%'}]}>
              <Text style={styles.loginBtn}> اختيار</Text>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onSetSelectedDate: selectedDate => dispatch(setSelectedDate(selectedDate)),
  onSetMonthPlanId: id => dispatch(setMonthPlanId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DriverHome);
