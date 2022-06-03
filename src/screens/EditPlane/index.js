import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import {Icon} from '../../components';
import {colors, images} from '../../config';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Tab, TabView, FAB, Header} from 'react-native-elements';
import {
  VStack,
  HStack,
  Modal,
  Box,
  Radio,
  Spinner,
  useToast,
} from 'native-base';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
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
  isWeekend,
  subMonths,
  isSameMonth,
} from 'date-fns';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScrollPicker from 'react-native-scroll-picker-wheel';
import {connect} from 'react-redux';
import {setPlan, addPlan, editPlan} from '../../redux/actions/Index';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  handlePreviousDays,
  handleWeekends,
  arabicMonths,
  dotColors,
} from '../../services/calendar';
import {API_URL} from '@env';

const EditPlane = props => {
  const [planComplete, setPlanComplete] = useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  //CALENDAR
  const [selectedDay, setSelectedDay] = useState(null);
  // const [selectedDay, setSelectedDay] = useState(
  //   format(new Date(), 'yyyy-MM-dd'),
  // );
  const [selectedDayToSave, setSelectedDayToSave] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [previousDays, setPreviousDays] = useState({});
  const [currentMonth, setCurrentMonth] = useState(
    props.planDetailsDate?.planDetailsMonth,
  );
  const [currentYear, setCurrentYear] = useState(
    props.planDetailsDate?.planDetailsYear,
  );

  // CALENDAR DAY DOTS COLOR
  const schools1 = dotColors.schools1;
  const schools2 = dotColors.schools2;
  const others1 = dotColors.others1;
  const others2 = dotColors.others2;
  const holiday1 = dotColors.holiday1;
  const holiday2 = dotColors.holiday2;

  //SCHOOLS
  const [stateSchool, setStateSchool] = useState([]);
  const [selectedStateSchool, setSelectedStateSchool] = useState({});
  const [chooseSchool, setChooseSchool] = useState(false);
  const [chooseOthers, setChooseOthers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [schoolName, setSchoolName] = useState(null);
  const [destination, setDestination] = useState(null);

  const [oldDestination, setOldDestination] = useState(null);
  const [changeType, setChangeType] = useState(null);

  //MODALS
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [showSeatsModal, setShowSeatsModal] = useState(false);

  // MONTH DETAILS
  const [placeDates, setPlaceDates] = useState([]);
  const [schoolDates, setSchoolDates] = useState([]);
  const [daysoff, setDaysoff] = useState([]);

  // CHANGE PLAN
  const [changePlans, setChangePlans] = useState([]);
  const [selectedChangePlan, setSelectedChangePlan] = useState([]);
  const [isChange, setIsChange] = useState(false);

  // GET STATE SCHOOL
  useEffect(() => {
    const getStateSchool = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(`${API_URL}get/state/schools/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setStateSchool(response.data);
    };

    // // GET CURRENT MONTH & YEAR
    // setCurrentMonth(format(new Date(), 'MM'));
    // setCurrentYear(format(new Date(), 'yyyy'));

    getStateSchool();
  }, []);

  // useEffect(() => {
  //   setPreviousDays(handleWeekends(previousDays));
  // }, []);

  // GET DAYSOFF
  useEffect(() => {
    // setPreviousDays(
    //   getMonthDetails(previousDays, selectedDay, currentMonth, currentYear),
    // );

    const getMonthDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('id_token');
        const response = await axios.get(`${API_URL}get/month/dates/details/`, {
          params: {
            month: currentMonth,
            year: currentYear,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setPlaceDates(response.data.places_dates);
        setSchoolDates(response.data.schools_dates);
        setDaysoff(response.data.daysff_dates);
        setPlanComplete(response.data.finished);
        // console.log('plan', response.data.finished);
        // console.log('reload', props.reload);
        // console.log('setPlaceDates', response.data.places_dates);
      } catch (error) {
        console.log(error);
      }

      // GET PLANS TO BE CHANGED
      try {
        const token = await AsyncStorage.getItem('id_token');
        const response = await axios.get(`${API_URL}get/edit/plan/details/`, {
          params: {
            month: currentMonth,
            year: currentYear,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setChangePlans(response.data.plans);
        console.log('plan', response.data.plans);
      } catch (error) {
        console.log(error);
      }

      // setPreviousDays(
      //   handleGetMonthDetails(
      //     previousDays,
      //     currentMonth,
      //     currentYear,
      //     response.data,
      //   ),
      // );

      // setPreviousDays(
      //   handleGetMonthDetails(previousDays, selectedDay, currentMonth, currentYear, response.data.places_dates),
      // );

      // console.log(handleGetMonthDetails(previousDays, selectedDay, currentMonth, currentYear, response.data.places_dates));
      // console.log(response.data);
      // setDaysoff(response.data.daysff_dates);
      // response.data.daysff_dates.forEach(item => {
      //   setPreviousDays(prev => {
      //     return {
      //       ...prev,
      //       [item]: {
      //         disabled: true,
      //         disableTouchEvent: true,
      //         dots: [holiday1, holiday2],
      //       },
      //     };
      //   });
      // });
      // response.data.places_dates.forEach(item => {
      //   setPreviousDays(prev => {
      //     return {
      //       ...prev,
      //       [item]: {
      //         // disabled: true,
      //         // disableTouchEvent: true,
      //         dots: [others1, others2],
      //         selected: selectedDay == item ? true : false,
      //         marked: true,
      //         selectedColor: '#7F05A3',
      //       },
      //     };
      //   });
      // });
    };
    getMonthDetails();
  }, [currentMonth, currentYear, props.reload]);

  LocaleConfig.locales.ar = arabicMonths;
  LocaleConfig.defaultLocale = 'ar';

  useEffect(() => {
    placeDates.forEach(item => {
      // console.log('item', item);
      // console.log('selectedDay', selectedDay);
      setPreviousDays(prev => {
        return {
          ...prev,
          [item]: {
            // disabled: new Date(item) < new Date() || isWeekend(new Date(format(subDays(new Date(item), -1), 'yyyy-MM-dd'))) ? true : false,
            // disabled: new Date(item) < new Date() ? true : false,
            // disableTouchEvent: new Date(item) < new Date() ? true : false,
            dots: [others1, others2],
            selected: selectedDay === item ? true : false,
            selectedColor: '#7F05A3',
          },
        };
      });
    });
    schoolDates.forEach(item => {
      setPreviousDays(prev => {
        return {
          ...prev,
          [item]: {
            // disabled: new Date(item) < new Date() ? true : false,
            // disableTouchEvent: new Date(item) < new Date() ? true : false,
            dots: [schools1, schools2],
            selected: selectedDay === item ? true : false,
            selectedColor: '#7F05A3',
          },
        };
      });
    });
    //DAYS OFF
    daysoff.forEach(item => {
      setPreviousDays(prev => {
        return {
          ...prev,
          [item]: {
            disabled: true,
            disableTouchEvent: true,
            dots: [holiday1, holiday2],
          },
        };
      });
    });

    // for (let i = parseInt(format(new Date(), 'dd')); i >= 1; i--) {
    //   let loopDate = format(subDays(new Date(), i), 'yyyy-MM-dd');
    //   setPreviousDays(prev => {
    //     return {
    //       ...prev,
    //       [loopDate]: {
    //         disabled: true,
    //         disableTouchEvent: true,
    //         // dots: [holiday1, holiday2],
    //       },
    //     };
    //   });
    // }

    // DISABLE CURRENT MONTH WEEKENDS
    eachWeekendOfMonth(new Date()).forEach(item => {
      setPreviousDays(prev => {
        return {
          ...prev,
          [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
            disabled: true,
            disableTouchEvent: true,
            dots: [holiday1, holiday2],
          },
        };
      });
    });

    // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
    format(lastDayOfMonth(new Date()), 'eeee') === 'Friday' ||
    format(lastDayOfMonth(new Date()), 'eeee') === 'Saturday'
      ? setPreviousDays(prev => {
          return {
            ...prev,
            [format(lastDayOfMonth(new Date()), 'yyyy-MM-dd')]: {
              disabled: true,
              disableTouchEvent: true,
              dots: [dotColors.holiday1, dotColors.holiday2],
            },
          };
        })
      : null;

    // DISABLE SECOND MONTH WEEKENDS
    eachWeekendOfMonth(addMonths(new Date(), 1)).forEach(item => {
      setPreviousDays(prev => {
        return {
          ...prev,
          [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
            disabled: true,
            disableTouchEvent: true,
            dots: [holiday1, holiday2],
          },
        };
      });
    });

    // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
    format(lastDayOfMonth(addMonths(new Date(), 1)), 'eeee') === 'Friday' ||
    format(lastDayOfMonth(addMonths(new Date(), 1)), 'eeee') === 'Saturday'
      ? setPreviousDays(prev => {
          return {
            ...prev,
            [format(lastDayOfMonth(addMonths(new Date(), 1)), 'yyyy-MM-dd')]: {
              disabled: true,
              disableTouchEvent: true,
              dots: [dotColors.holiday1, dotColors.holiday2],
            },
          };
        })
      : null;

    // DISABLE THIRD MONTH WEEKENDS
    eachWeekendOfMonth(addMonths(new Date(), 2)).forEach(item => {
      setPreviousDays(prev => {
        return {
          ...prev,
          [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
            disabled: true,
            disableTouchEvent: true,
            dots: [holiday1, holiday2],
          },
        };
      });
    });

    // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
    format(lastDayOfMonth(addMonths(new Date(), 2)), 'eeee') === 'Friday' ||
    format(lastDayOfMonth(addMonths(new Date(), 2)), 'eeee') === 'Saturday'
      ? setPreviousDays(prev => {
          return {
            ...prev,
            [format(lastDayOfMonth(addMonths(new Date(), 2)), 'yyyy-MM-dd')]: {
              disabled: true,
              disableTouchEvent: true,
              dots: [dotColors.holiday1, dotColors.holiday2],
            },
          };
        })
      : null;

    // DISABLE FOURTH MONTH WEEKENDS
    eachWeekendOfMonth(addMonths(new Date(), 3)).forEach(item => {
      setPreviousDays(prev => {
        return {
          ...prev,
          [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
            disabled: true,
            disableTouchEvent: true,
            dots: [holiday1, holiday2],
          },
        };
      });
    });

    // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
    format(lastDayOfMonth(addMonths(new Date(), 3)), 'eeee') === 'Friday' ||
    format(lastDayOfMonth(addMonths(new Date(), 3)), 'eeee') === 'Saturday'
      ? setPreviousDays(prev => {
          return {
            ...prev,
            [format(lastDayOfMonth(addMonths(new Date(), 3)), 'yyyy-MM-dd')]: {
              disabled: true,
              disableTouchEvent: true,
              dots: [dotColors.holiday1, dotColors.holiday2],
            },
          };
        })
      : null;
  }, [selectedDay, placeDates && schoolDates && daysoff]);

  // HANDLE SELECTED DAY
  const handleSelectDate = date => {
    // props.onCheckSelectedDate(new Date(date.dateString));
    setSelectedDay(date.dateString);
    // bs.current.snapTo(0);
    console.log(date.dateString);

    // SET CHANGE PLANS TO SELECTED DATA
    changePlans.forEach(item => {
      if (date.dateString == item.date) {
        console.log(item);
        setSelectedChangePlan(item);
      }
    });
  };

  // HANDLE SELECT SCHOOL STATE
  const handleSelectStateSchool = item => {
    setSelectedStateSchool(item);
    setDestination(item?.schools[0]?.id);
    setSchoolName(item?.schools[0]?.name);
    console.log(item);
    setChooseSchool(true);
  };

  // RENDER SCHOOL STATES FOR FLATLIST
  const renderStates = ({item}) => (
    <VStack space={2} alignItems="center" style={{marginHorizontal: 5}}>
      <FAB
        icon={<Image style={styles.img} source={images.awesome_school} />}
        color="#9FD49D"
        onPress={() => {
          handleSelectStateSchool(item);
        }}
      />
      <Text style={{color: '#000'}}>{item.name}</Text>
    </VStack>
  );

  // HANDLE SET PLAN
  const handleSetPlan = method => {
    const destinationType = chooseSchool ? 0 : 1;
    const formData = new FormData();
    formData.append('date', selectedDay);
    formData.append('destination_type', destinationType);
    formData.append('destination', Number(destination));
    formData.append('go_method', method);
    // console.log(format(selectedDay, 'yyyy-MM-dd'));
    // console.log(selectedDay);
    const plan = {
      date: selectedDay,
      destination_type: destinationType,
      destination: Number(destination),
      go_method: method,
      schoolName: schoolName,
      editPlan: true,
    };
    // console.log(selectedDay);
    // console.log(Number(destination));
    setShowMethodModal(false);
    resetPlace();
    if (method === 1) {
      // console.log('driver here');

      const getDriverDetails = async () => {
        const token = await AsyncStorage.getItem('id_token');
        try {
          const response = await axios.get(`${API_URL}get/car/details/`, {
            params: {
              date: selectedDay,
              school: Number(destination),
            },
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (Object.keys(response.data).length) {
            if (response.data?.car_details?.available_seats?.length > 0) {
              props.onSetPlan(plan);
              navigation.navigate('ChooseYourSeat');
            } else {
              // SET NO SEATS AVAILABLE MODAL
              setShowSeatsModal(true);
            }
          } else {
            setShowSeatsModal(true);
          }
        } catch (error) {
          // SET NO CAR AVAILABLE MODAL
          setShowSeatsModal(true);
          // alert('عذراً.. لا يتوفر سائق في هذا اليوم');
          console.log(error);
          // console.log(response.data);
        }
      };

      getDriverDetails();
    } else {
      props.onSetPlan(plan);
      toast.show({
        description: 'تمت إضافة الخطة',
      });
      // setDestination(null);
      resetPlace();
      // props.onCreatePlan(formData, navigation.navigate, toast);
      // navigation.navigate('SchoolRoute');
    }
  };

  const resetPlace = () => {
    setChooseSchool(false);
    setChooseOthers(false);
  };

  const handleSavePlan = () => { 
    if (!isChange) {
      if (Object.keys(props.plan).length) {
        const formData = new FormData();
        formData.append('date', props.plan.date);
        formData.append('destination_type', props.plan.destination_type);
        formData.append('destination', props.plan.destination);
        formData.append('go_method', props.plan.go_method);
        if (props.plan.go_method == 1) {
          formData.append('car', props.plan?.car);
          formData.append('car_seat', props.plan?.car_seat);
        }
        console.log(formData);
        props.onAddPlan(formData, navigation.navigate, toast);
        setDestination(null);
        resetPlace();
      } else {
        alert('الرجاء إضافة خطة');
      }
    } else {
      if (Object.keys(props.plan).length) {
        const formData = new FormData();
        formData.append('old_destination', props.plan.old_destination);
        formData.append('destination_type', props.plan.destination_type);
        formData.append('destination', props.plan.destination);
        formData.append('go_method', props.plan.go_method);
        if (props.plan.go_method == 1) {
          formData.append('car', props.plan?.car);
          formData.append('car_seat', props.plan?.car_seat);
        }
        console.log(formData);
        props.onEditPlan(formData, navigation.navigate, toast);
        setDestination(null);
        resetPlace();
        setIsChange(false);
      } else {
        alert('الرجاء اختيار خطة');
      }
    }
    
  };

  const handleAddButton = () => {
    if (selectedDay) {
      const destinationType = chooseSchool ? 0 : 1;
      if (destination) {
        if (destinationType === 1) {
          const plan = {
            date: selectedDay,
            destination_type: destinationType,
            destination: Number(destination),
            go_method: 0,
            editPlan: true,
          };
          props.onSetPlan(plan);
          toast.show({
            description: 'تمت إضافة الخطة',
          });
          // setDestination(null);
          resetPlace();
        } else {
          setShowMethodModal(true);
        }
      } else {
        alert('الرجاء اختيار المكان');
      }
    } else {
      alert('الرجاء اختيار تاريخ معين');
    }
  };

  const handleConfirmChange = method => {
    const destinationType = chooseSchool ? 0 : 1;
    const formData = new FormData();
    formData.append('old_destination', oldDestination);
    formData.append('destination_type', destinationType);
    formData.append('destination', Number(destination));
    formData.append('go_method', method);
    // console.log(format(selectedDay, 'yyyy-MM-dd'));
    // console.log(selectedDay);
    const plan = {
      date: selectedDay,
      old_destination: oldDestination,
      destination_type: destinationType,
      destination: Number(destination),
      go_method: method,
      schoolName: schoolName,
      editPlan: true,
    };
    // console.log(selectedDay);
    // console.log(Number(destination));
    setShowMethodModal(false);
    resetPlace();
    if (method === 1) {
      // console.log('driver here');

      const getDriverDetails = async () => {
        const token = await AsyncStorage.getItem('id_token');
        try {
          const response = await axios.get(`${API_URL}get/car/details/`, {
            params: {
              date: selectedDay,
              school: Number(destination),
            },
            headers: {
              Authorization: `Token ${token}`,
            },
          });

          if (Object.keys(response.data).length) {
            if (response.data?.car_details?.available_seats?.length > 0) {
              props.onSetPlan(plan);
              navigation.navigate('ChooseYourSeat');
            } else {
              // SET NO SEATS AVAILABLE MODAL
              setShowSeatsModal(true);
            }
          } else {
            setShowSeatsModal(true);
          }
        } catch (error) {
          // SET NO CAR AVAILABLE MODAL
          setShowSeatsModal(true);
          // alert('عذراً.. لا يتوفر سائق في هذا اليوم');
          console.log(error);
          // console.log(response.data);
        }
      };

      getDriverDetails();
    } else {
      props.onSetPlan(plan);
      toast.show({
        description: 'تم تعديل الخطة',
      });
      // setDestination(null);
      resetPlace();
      // props.onCreatePlan(formData, navigation.navigate, toast);
      // navigation.navigate('SchoolRoute');
    }
  };

  const handleShowChangeModal = () => {
    if (Object.keys(selectedChangePlan).length) {
      if (destination) {
        setShowModal(true);
      } else {
        alert('الرجاء اختيار المكان');
      }
    } else {
      alert('الرجاء اختيار تاريخ معين');
    }
  };

  const renderChangePlans = ({item}) => item.destination_details?.name ? (
    <Radio style={{alignSelf: 'flex-start'}} value={item.id} my={1}>
      {item.destination_details?.name}
    </Radio>
  ) : null;

  return (
    <SafeAreaView
      style={{backgroundColor: '#FFF', width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        rightContainerStyle={{right: 10}}
        leftContainerStyle={{left: 10}}
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
          text: 'تعديل خطة',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        rightComponent={
          <Pressable onPress={handleSavePlan}>
            <HStack space={1} alignItems="center">
              <Icon
                name={'save'}
                type={'material'}
                color={colors.primary}
                size={18}
              />
              <Text
                style={[
                  styles.loginBtn,
                  {
                    color: colors.primary,
                    marginHorizontal: 5,
                    fontSize: 14,
                  },
                ]}>
                حفظ
              </Text>
            </HStack>
          </Pressable>
        }
      />
      {/* CALENDAR */}
      <View style={{width: '100%', alignSelf: 'center'}}>
        <Calendar
          current={`${props.planDetailsDate?.planDetailsYear}-${props.planDetailsDate?.planDetailsMonth}-01`}
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
            props.onSetPlan({});
            resetPlace();
            setSelectedDay(null);
            // console.log(`${props.planDetailsDate?.planDetailsYear}-${props.planDetailsDate?.planDetailsMonth}-01`);
          }}
          hideArrows
          onPressArrowLeft={
            subtractMonth =>
              isSameMonth(new Date(selectedMonth), subMonths(new Date(), 6))
                ? null
                : subtractMonth()
            // isThisMonth(new Date(selectedMonth)) ? null : subtractMonth()
            // `${props.planDetailsDate?.planDetailsYear}-${props.planDetailsDate?.planDetailsMonth}-01`
            // isThisMonth(new Date(selectedMonth)) ? null : subtractMonth()
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
              selectedColor: '#7F05A3',
            },
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
      {/* CALENDAR LEGEND */}
      <HStack
        style={{backgroundColor: '#F4F4F4', borderRadius: 15}}
        justifyContent="space-evenly"
        alignItems="center"
        space={2}
        width="85%"
        height="50"
        alignSelf="center">
        <HStack alignItems="center" space={1}>
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              backgroundColor: '#F9A300',
            }}
          />
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              backgroundColor: '#F9A300',
            }}
          />
          <Text style={[styles.loginBtn, {color: '#000', marginHorizontal: 5}]}>
            مدارس
          </Text>
        </HStack>
        <HStack alignItems="center" space={1}>
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              backgroundColor: 'blue',
            }}
          />
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              backgroundColor: 'blue',
            }}
          />
          <Text style={[styles.loginBtn, {color: '#000', marginHorizontal: 5}]}>
            أخرى
          </Text>
        </HStack>
        <HStack alignItems="center" space={1}>
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              backgroundColor: 'red',
            }}
          />
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              backgroundColor: 'red',
            }}
          />
          <Text style={[styles.loginBtn, {color: '#000', marginHorizontal: 5}]}>
            إجازة
          </Text>
        </HStack>
      </HStack>
      <VStack
        style={{
          flex: 1,
          marginTop: 20,
        }}>
        <HStack
          style={{
            // justifyContent: 'space-evenly',
            // backgroundColor: colors.primary,
            // paddingVertical: '4%',
            // paddingHorizontal: '10%',
            height: hp('6%'),
            width: '100%',
            // alignSelf: 'center',
            marginVertical: 10,
          }}>
          <Pressable
            onPress={handleAddButton}
            style={{
              width: '50%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
            }}>
            <Text
              style={[
                styles.loginBtn,
                {color: colors.white, marginHorizontal: 5},
              ]}>
              إضافة
            </Text>
          </Pressable>
          <Pressable
            // onPress={() =>
            //   Alert.alert('استبدال خطة', 'سيتم إضافة هذه الخاصية قريبا')
            // }
            onPress={handleShowChangeModal}
            style={{
              width: '50%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.white,
              borderWidth: 1,
              borderColor: colors.primary,
            }}>
            <Text
              style={[
                styles.loginBtn,
                {color: colors.primary, marginHorizontal: 5},
              ]}>
              استبدال
            </Text>
          </Pressable>
        </HStack>
        {!chooseSchool && !chooseOthers ? (
          <HStack
            style={{
              justifyContent: 'space-evenly',
              width: '95%',
              alignSelf: 'center',
              marginTop: 15,
            }}>
            {stateSchool?.states?.length ? (
              <Box style={{width: '75%'}}>
                <FlatList
                  horizontal
                  data={stateSchool?.states}
                  keyExtractor={item => item.id}
                  renderItem={renderStates}
                  // style={{marginHorizontal: 5}}
                />
              </Box>
            ) : (
              <Spinner color={colors.primary} size="lg" />
            )}

            {/* {stateSchool?.states?.length ? (
              stateSchool?.states?.map(item => (
                <VStack key={item.id} space={2} alignItems="center">
                  <FAB
                    icon={
                      <Image
                        style={styles.img}
                        source={images.awesome_school}
                      />
                    }
                    color="#9FD49D"
                    onPress={() => handleSelectStateSchool(item)}
                  />
                  <Text style={{color: '#000'}}>{item.name}</Text>
                </VStack>
              ))
            ) : (
              <Spinner color={colors.primary} size="lg" />
            )} */}

            {/* <VStack space={2} alignItems="center">
              <FAB
                icon={
                  <Image style={styles.img} source={images.awesome_school} />
                }
                color="#9FD49D"
                onPress={() => setChooseSchool(true)}
              />
              <Text style={{color: '#000'}}> مدارس البريمي </Text>
            </VStack>
            <VStack space={2} alignItems="center">
              <FAB
                icon={
                  <Image style={styles.img} source={images.mahada_school} />
                }
                color="#DEC8E5"
                onPress={() => setChooseSchool(true)}
                // color="rgba(127, 5, 163, 0.2)"
              />
              <Text style={{color: '#000'}}> مدارس محضة </Text>
            </VStack>
            <VStack space={2} alignItems="center">
              <FAB
                icon={
                  <Image style={styles.img} source={images.sanena_school} />
                }
                color="#E6B9A9"
                onPress={() => setChooseSchool(true)}
              />
              <Text style={{color: '#000'}}> مدارس السنية </Text>
            </VStack>
            */}
            <VStack space={2} alignItems="center">
              <FAB
                icon={<Icon name={'add'} type={'material'} color={'#837777'} />}
                color="#CACACA"
                onPress={() => {
                  setDestination(stateSchool?.places[0]?.id);
                  setChooseOthers(true);
                }}
              />
              <Text style={{color: '#000'}}> أخرى </Text>
            </VStack>
          </HStack>
        ) : !chooseOthers && chooseSchool ? (
          <VStack height="140">
            <ScrollPicker
              dataSource={selectedStateSchool?.schools.map(item => item.name)}
              selectedIndex={0}
              renderItem={(data, index, isSelected) => {
                // console.log('first render', data);
                //
              }}
              onValueChange={(data, selectedIndex) => {
                console.log('index: ', data);
                setSchoolName(data);
                selectedStateSchool?.schools.forEach(item => {
                  if (item.name === data) {
                    setDestination(item.id);
                  }
                });
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
        ) : null}

        {chooseOthers && !chooseSchool ? (
          <VStack height="140">
            <ScrollPicker
              dataSource={stateSchool?.places?.map(item => item.name)}
              selectedIndex={0}
              renderItem={(data, index, isSelected) => {
                console.log(isSelected);
                //
              }}
              onValueChange={(data, selectedIndex) => {
                // console.log('index: ', selectedIndex);
                stateSchool?.places.forEach(item => {
                  if (item.name === data) {
                    setDestination(item.id);
                    console.log('itemID: ', item.id);
                  }
                });
                // setDestination(selectedIndex);
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
        ) : null}

        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            marginBottom: Platform.OS === 'android' ? 20 : 0,
          }}>
          {/* <Pressable onPress={() => setVisible(true)} style={styles.btn}> */}
          {chooseSchool || chooseOthers ? (
            <HStack style={{justifyContent: 'space-evenly'}}>
              <Pressable
                onPress={() => {
                  setChooseSchool(false);
                  setChooseOthers(false);
                }}
                style={[
                  styles.btn,
                  {
                    backgroundColor: colors.white,
                    borderWidth: 1,
                    borderColor: colors.primary,
                  },
                ]}>
                <Text style={[styles.loginBtn, {color: colors.primary}]}>
                  {' '}
                  إعادة الاختيار{' '}
                </Text>
              </Pressable>
            </HStack>
          ) : null}

          {/* <Pressable
            onPress={() => navigation.navigate('AddPlane')}
            style={styles.btn}>
            <Text style={styles.loginBtn}> تأكيد الخطة وتسليمها </Text>
          </Pressable> */}
        </View>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{alignItems: 'center'}}>
            استبدل المدرسة
          </Modal.Header>
          <Modal.Body>
            <Radio.Group
              style={{paddingHorizontal: '10%'}}
              name="myRadioGroup"
              accessibilityLabel="change place"
              value={oldDestination?.id}
              onChange={nextValue => {
                setOldDestination(nextValue);
                selectedChangePlan?.destination_list?.forEach(item => {
                  if (item.id === nextValue) {
                    setChangeType(item.type);
                  }
                });
                // setChangeType(nextValue.type);
                console.log('nextValue: ', nextValue);
              }}>
              <FlatList
                data={selectedChangePlan.destination_list}
                // keyExtractor={item => item.id}
                renderItem={renderChangePlans}
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
              onPress={() => {
                if (oldDestination) {
                  const destinationType = chooseSchool ? 0 : 1;
                  if (changeType === destinationType) {
                    setShowModal(false);
                    setIsChange(true);
                    if (destinationType === 0) {
                      setShowMethodModal(true);
                    } else {
                      handleConfirmChange(0);
                    }
                  } else {
                    alert('لا يمكن اختيار مدرسة و مكان عمل في نفس اليوم');
                  }
                } else {
                  alert('الرجاء اختيار مكان');
                }
              }}
              style={[styles.btn, {width: 220, marginTop: '5%'}]}>
              <Text style={styles.loginBtn}> استبدال</Text>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/* CHOOSE METHOD MODAL */}
      <Modal isOpen={showMethodModal} onClose={() => setShowMethodModal(false)}>
        <Modal.Content maxWidth="400px" paddingY={7}>
          <VStack space={5}>
            <Text style={styles.address1}> طريقة الذهاب </Text>
            <HStack justifyContent="center" space={5}>
              <Pressable
                onPress={() => {
                  isChange ? handleConfirmChange(1) : handleSetPlan(1);
                }}
                style={styles.driver_btn}>
                <Text style={styles.driver_txt}>سائق</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  isChange ? handleConfirmChange(0) : handleSetPlan(0);
                }}
                style={styles.special_car}>
                <Text style={styles.special_car_txt}>سيارة خاصة</Text>
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Content>
      </Modal>

      {/* NO SEATS MODAL */}
      <Modal isOpen={showSeatsModal} onClose={() => setShowSeatsModal(false)}>
        <Modal.Content maxWidth="400px" paddingY={7} style={{width: '90%'}}>
          <VStack space={5}>
            <Text style={[styles.address1, {lineHeight: 22}]}>
              {' '}
              عذراً.. اكتمل العدد في هذه السيارة ، هل ترغب في الذهاب بسيارتك
              الخاصة أو بإمكانك تغيير خطتك الى مدرسة أخرى{' '}
            </Text>
            <HStack justifyContent="center" space={5}>
              <Pressable
                onPress={() => {
                  setShowSeatsModal(false);
                }}
                style={[
                  styles.driver_btn,
                  {width: null, paddingHorizontal: 5},
                ]}>
                <Text style={styles.driver_txt}>الرجوع لتغيير الخطة</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowSeatsModal(false);
                  if (isChange) {
                    handleConfirmChange(0);
                  } else {
                    handleSetPlan(0);
                  }
                }}
                style={[
                  styles.special_car,
                  {width: null, paddingHorizontal: 5},
                ]}>
                <Text style={styles.special_car_txt}>
                  الذهاب بسيارتي الخاصة
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Content>
      </Modal>
      {/* <GoMethod
        onRequestCChoose={item => {
          setVisible(false);
          navigation.navigate('ChooseYourSeat');
        }}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      /> */}

      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" paddingY={7}>
          <VStack space={5}>
            <Text style={styles.address1}> طريقة الذهاب </Text>
            <HStack justifyContent="center" space={5}>
              <Pressable
                onPress={() => {
                  navigation.navigate('ChooseYourSeat');
                  setShowModal(false);
                }}
                style={styles.driver_btn}>
                <Text style={styles.driver_txt}>سائق</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate('ChooseYourSeat');
                  setShowModal(false);
                }}
                style={styles.special_car}>
                <Text style={styles.special_car_txt}>سيارة خاصة</Text>
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Content>
      </Modal> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  planDetailsDate: state.plan.planDetailsDate,
  plan: state.plan.plan,
  reload: state.ui.reload,
});

const mapDispatchToProps = dispatch => ({
  onSetPlan: plan => dispatch(setPlan(plan)),
  onAddPlan: (plan, navigateToTarget, toast) =>
    dispatch(addPlan(plan, navigateToTarget, toast)),
  onEditPlan: (plan, navigateToTarget, toast) =>
    dispatch(editPlan(plan, navigateToTarget, toast)),
  // onCreatePlan: (plan, navigateToTarget, toast) =>
  //   dispatch(createPlan(plan, navigateToTarget, toast)),
  // onSetPlan: plan => dispatch(setPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlane);
