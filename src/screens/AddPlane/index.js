//Add Plan
import React, {useState, useEffect, useCallback} from 'react';
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
import GoMethod from './GoMethod';
import styles from './styles';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {Tab, TabView, FAB, Header} from 'react-native-elements';
import {VStack, HStack, Modal, Spinner, useToast, Box} from 'native-base';
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
} from 'date-fns';
import {ar} from 'date-fns/locale';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScrollPicker from 'react-native-scroll-picker-wheel';
import {connect} from 'react-redux';
import {
  createPlan,
  setPlan,
  setPlanDetailsDate,
} from '../../redux/actions/Index';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  handlePreviousDays,
  arabicMonths,
  dotColors,
  // handleGetMonthDetails,
} from '../../services/calendar';
import {API_URL} from '@env';

const AddPlane = props => {
  const [planComplete, setPlanComplete] = useState(false);
  const [approvedRequest, setApprovedRequest] = useState(false);
  const [approved, setApproved] = useState(false);
  const [destination, setDestination] = useState(null);
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
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'MM'));
  const [currentYear, setCurrentYear] = useState(format(new Date(), 'yyyy'));
  // const [daysoff, setDaysoff] = useState([]);

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

  //MODAL
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showSeatsModal, setShowSeatsModal] = useState(false);

  // MONTH DETAILS
  const [placeDates, setPlaceDates] = useState([]);
  const [schoolDates, setSchoolDates] = useState([]);
  const [daysoff, setDaysoff] = useState([]);

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
      // GET IS PLAN COMPLETE
      // const planComplete = await AsyncStorage.getItem('plan_complete');
      // setPlanComplete(planComplete);
      // console.log(planComplete);
    };

    // GET CURRENT MONTH & YEAR
    setCurrentMonth(format(new Date(), 'MM'));
    setCurrentYear(format(new Date(), 'yyyy'));

    getStateSchool();
  }, []);

  // useEffect(() => {
  //   setPreviousDays(handlePreviousDays(previousDays));
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
        setApprovedRequest(response.data.approved_request);
        setApproved(response.data.approved);
        console.log('plan', response.data.finished);
        console.log('reload', props.reload);
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
      setPreviousDays(prev => {
        return {
          ...prev,
          [item]: {
            // disabled: new Date(item) < new Date() || isWeekend(new Date(format(subDays(new Date(item), -1), 'yyyy-MM-dd'))) ? true : false,
            disabled: new Date(item) < new Date() ? true : false,
            disableTouchEvent: new Date(item) < new Date() ? true : false,
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
            disabled: new Date(item) < new Date() ? true : false,
            disableTouchEvent: new Date(item) < new Date() ? true : false,
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

    for (let i = parseInt(format(new Date(), 'dd')); i >= 1; i--) {
      let loopDate = format(subDays(new Date(), i), 'yyyy-MM-dd');
      setPreviousDays(prev => {
        return {
          ...prev,
          [loopDate]: {
            disabled: true,
            disableTouchEvent: true,
            // dots: [holiday1, holiday2],
          },
        };
      });
    }

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

  // HANDLE DISABLED DAYS IN CALENDAR
  const handleGetMonthDetails = useCallback(
    (previousDays, currentMonth, currentYear, response) => {
      let newPreviousDays = previousDays;
      response.places_dates.forEach(item => {
        newPreviousDays = {
          ...newPreviousDays,
          [item]: {
            dots: [dotColors.others1, dotColors.others2],
            selected: selectedDay === item ? true : false,
            // marked: true,
            selectedColor: '#7F05A3',
          },
        };
      });
      console.log('musta');

      return newPreviousDays;
    },
    [selectedDay],
  );

  const resetPlace = () => {
    setChooseSchool(false);
    setChooseOthers(false);
  };

  // HANDLE SELECTED DAY
  const handleSelectDate = date => {
    resetPlace();
    // props.onCheckSelectedDate(new Date(date.dateString));
    setSelectedDay(date.dateString);
    // bs.current.snapTo(0);
    console.log(date.dateString);
  };

  // HANDLE SELECT SCHOOL STATE
  const handleSelectStateSchool = item => {
    setSelectedStateSchool(item);
    setDestination(item?.schools[0]?.id);
    setSchoolName(item?.schools[0]?.name);
    console.log(item);
    setChooseSchool(true);
  };

  // HANDLE SET PLAN
  const handleSetPlan = method => {
    const destinationType = chooseSchool ? 0 : 1;
    const formData = new FormData();
    formData.append('date', selectedDay);
    formData.append('destination_type', destinationType);
    formData.append('destination', Number(destination));
    formData.append('go_method', method);
    // console.log(format(selectedDay, 'yyyy-MM-dd'));
    console.log(selectedDay);
    const plan = {
      date: selectedDay,
      destination_type: destinationType,
      destination: Number(destination),
      go_method: method,
      schoolName: schoolName,
      editPlan: false,
    };
    console.log(plan);
    // console.log(Number(destination));
    setShowModal(false);
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
              resetPlace();
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

        // console.log(response.status);
        // if (response.status !== 200) {
        //   alert(response.data?.msg);
        // }
      };

      getDriverDetails();
    } else {
      props.onCreatePlan(formData, navigation.navigate, toast);
      resetPlace();
      // navigation.navigate('SchoolRoute');
    }
  };

  // HANDLE VIEW PLAN
  const handleViewPlan = () => {
    const planDetailsDate = {
      planDetailsMonth: currentMonth,
      planDetailsYear: currentYear,
    };
    props.onSetPlanDetailsDate(planDetailsDate);
    navigation.navigate('PlaneDetails');
  };

  const handleEditPlan = () => {
    if (approved || approvedRequest) {
      alert('لا يمكن تعديل الخطة لأنها قيد الاعتماد أو معتمدة');
    } else {
      props.onSetPlan({});
      const planDetailsDate = {
        planDetailsMonth: currentMonth,
        planDetailsYear: currentYear,
      };
      props.onSetPlanDetailsDate(planDetailsDate);
      navigation.navigate('EditPlane');
    }
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

  return (
    <SafeAreaView
      style={{backgroundColor: '#FFF', width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Box style={{width: '95%', alignSelf: 'center'}}>
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
          text: 'إضافة خطة شهرية',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        rightComponent={{icon: 'file-replace-outline', type: 'material-community', color: '#000', onPress: () => handleEditPlan()}}
      />
      </Box>
      {/* CALENDAR */}
      <View style={{width: '100%', alignSelf: 'center'}}>
        <Calendar
          // current={format(new Date(), 'yyyy-MM-dd')}
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
              selectedColor: '#7F05A3',
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
        <Text style={[styles.address, {marginBottom: 15}]}> تحديد المكان </Text>
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
                stateSchool?.places?.forEach(item => {
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

        {/* <ScrollPicker
          dataSource={['مدرسة عزان', 'مدرسة الطلائع', 'مدرسة المجد', 'مدرسة الخوارزمي']}
          selectedIndex={1}
          renderItem={(data, index, isSelected) => {
            //
          }}
          onValueChange={(data, selectedIndex) => {
            //
          }}
          wrapperHeight={120}
          wrapperWidth={wp('100%')}
          wrapperBackground={'#FFFFFF'}
          itemHeight={40}
          highlightColor={'#d8d8d8'}
          highlightBorderWidth={2}
          // activeItemColor={'#222121'}
          itemColor={'#B4B4B4'}
        /> */}
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
              <Pressable
                onPress={() => {
                  if (selectedDay) {
                    chooseSchool ? setShowModal(true) : handleSetPlan(0);
                  } else {
                    alert('الرجاء اختيار تاريخ محدد');
                  }
                }
                }
                style={[styles.btn]}>
                <Text style={styles.loginBtn}> التالي </Text>
              </Pressable>
            </HStack>
          ) : (
            <Pressable
              onPress={() => (planComplete ? handleViewPlan() : null)}
              style={[
                styles.btn,
                {
                  backgroundColor: planComplete ? colors.primary : '#8B9494',
                },
              ]}>
              <Text style={styles.loginBtn}> استعراض الخطة </Text>
            </Pressable>
          )}

          {/* <Pressable
            onPress={() => navigation.navigate('AddPlane')}
            style={styles.btn}>
            <Text style={styles.loginBtn}> تأكيد الخطة وتسليمها </Text>
          </Pressable> */}
        </View>
      </VStack>
      {/* <GoMethod
        onRequestCChoose={item => {
          setVisible(false);
          navigation.navigate('ChooseYourSeat');
        }}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      /> */}

      {/* CHOOSE METHOD MODAL */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" paddingY={7}>
          <VStack space={5}>
            <Text style={styles.address1}> طريقة الذهاب </Text>
            <HStack justifyContent="center" space={5}>
              <Pressable
                onPress={() => {
                  handleSetPlan(1);
                }}
                style={styles.driver_btn}>
                <Text style={styles.driver_txt}>سائق</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  handleSetPlan(0);
                }}
                style={styles.special_car}>
                <Text style={styles.special_car_txt}>سيارة خاصة</Text>
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Content>
      </Modal>

      {/* NO DRIVER MODAL */}
      <Modal isOpen={showDriverModal} onClose={() => setShowDriverModal(false)}>
        <Modal.Content maxWidth="400px" paddingY={7} style={{width: '90%'}}>
          <VStack space={5}>
            <Text style={[styles.address1, {lineHeight: 22}]}>
              {' '}
              عذراً.. لا يتوفر سائق في هذا اليوم ، هل ترغب في الذهاب بسيارتك
              الخاصة أو بإمكانك تغيير خطتك الى مدرسة أخرى{' '}
            </Text>
            <HStack justifyContent="center" space={5}>
              <Pressable
                onPress={() => {
                  setShowDriverModal(false);
                }}
                style={[
                  styles.driver_btn,
                  {width: null, paddingHorizontal: 5},
                ]}>
                <Text style={styles.driver_txt}>الرجوع لتغيير الخطة</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowDriverModal(false);
                  handleSetPlan(0);
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
                  handleSetPlan(0);
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
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  reload: state.ui.reload,
});

const mapDispatchToProps = dispatch => ({
  onCreatePlan: (plan, navigateToTarget, toast) =>
    dispatch(createPlan(plan, navigateToTarget, toast)),
  onSetPlan: plan => dispatch(setPlan(plan)),
  onSetPlanDetailsDate: planDetailsDate =>
    dispatch(setPlanDetailsDate(planDetailsDate)),
  // onPostCreateNote: (formData, navigateToTarget, regToast) =>
  //   dispatch(postCreateNote(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlane);
