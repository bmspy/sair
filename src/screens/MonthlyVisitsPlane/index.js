import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {Tab, TabView, FAB, Header} from 'react-native-elements';
import {
  VStack,
  HStack,
  Modal,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
  StatusBar,
  Divider,
  Spinner,
} from 'native-base';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setPlanDetailsDate} from '../../redux/actions/Index';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  handlePreviousDays,
  arabicMonths,
  dotColors,
} from '../../services/calendar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API_URL} from '@env';

import {colors, images} from '../../config';
import styles from './styles';
import {Icon} from '../../components';
import SelectDropdown from 'react-native-select-dropdown';
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
import {ar} from 'date-fns/locale';

const MonthlyVisitsPlane = props => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  // PLAN DETAILS
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  // const [monthId, setMonthId] = useState(null);

  // PLAN DETAILS DATE
  // const [planDetailsMonth, setPlanDetailsMonth] = useState(
  //   format(new Date(), 'MM'),
  // );
  // const [planDetailsYear, setPlanDetailsYear] = useState(
  //   format(new Date(), 'yyyy'),
  // );

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

  // MONTH DETAILS
  const [placeDates, setPlaceDates] = useState([]);
  const [schoolDates, setSchoolDates] = useState([]);
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

  // useEffect(() => {
  //   setPreviousDays(handlePreviousDays(previousDays, selectedDay));
  // }, [selectedDay]);

  // GET DAYSOFF
  useEffect(() => {
    // setPreviousDays(
    //   getMonthDetails(previousDays, selectedDay, currentMonth, currentYear),
    // );

    const getMonthDetails = async () => {
      const token = await AsyncStorage.getItem('id_token');
      try {
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

  // GET DAYSOFF
  // useEffect(() => {
  //   // console.log(props.plan.destination);
  //   // const getDaysoff = async () => {
  //   //   const token = await AsyncStorage.getItem('id_token');
  //   //   const response = await axios.get(`${API_URL}get/month/daysoff/`, {
  //   //     params: {
  //   //       month: currentMonth,
  //   //       year: currentYear,
  //   //     },
  //   //     headers: {
  //   //       Authorization: `Token ${token}`,
  //   //     },
  //   //   });
  //   //   console.log(response.data.map(item => item.date));
  //   //   setDaysoff(response.data.map(item => item.date));

  //   //   response.data
  //   //     .map(item => item.date)
  //   //     .forEach(item => {
  //   //       setPreviousDays(prev => {
  //   //         return {
  //   //           ...prev,
  //   //           [item]: {
  //   //             disabled: true,
  //   //             disableTouchEvent: true,
  //   //             dots: [holiday1, holiday2],
  //   //           },
  //   //         };
  //   //       });
  //   //     });
  //   // };

  //   // getDaysoff();

  //   // IF MONTHLYPLANS IS NULL THEN GET THE DATA FIRST
  //   if (monthlyPlans.length === 0) {
  //     const getMonthlyPlans = async () => {
  //       const token = await AsyncStorage.getItem('id_token');
  //       const response = await axios.get(
  //         `${API_URL}get/monthly/visits/plan/details/`,
  //         {
  //           params: {
  //             year: currentYear,
  //           },
  //           headers: {
  //             Authorization: `Token ${token}`,
  //           },
  //         },
  //       );
  //       setIsLoading(false);
  //       // console.log(response.data);
  //       setMonthlyPlans(response.data);

  //       let monthId = null;
  //       response.data?.forEach(item => {
  //         if (currentMonth == item.month) {
  //           monthId = item.id;
  //         }
  //       });

  //       //GET SCHOOLS & PLACES
  //       const getSchoolsPlaces = async () => {
  //         const token = await AsyncStorage.getItem('id_token');
  //         const secondResponse = await axios.get(
  //           `${API_URL}get/month/dates/details/`,
  //           {
  //             params: {
  //               month_id: monthId,
  //             },
  //             headers: {
  //               Authorization: `Token ${token}`,
  //             },
  //           },
  //         );

  //         setSchoolDates(secondResponse.data.schools_dates);

  //         secondResponse.data.schools_dates.forEach(item => {
  //           setPreviousDays(prev => {
  //             return {
  //               ...prev,
  //               [item]: {
  //                 disabled: secondResponse.data.daysff_dates.includes(item)
  //                   ? true
  //                   : false,
  //                 disableTouchEvent: secondResponse.data.daysff_dates.includes(
  //                   item,
  //                 )
  //                   ? true
  //                   : false,
  //                 selected: selectedDay === item ? true : false,
  //                 selectedColor: '#7F05A3',
  //                 dots: secondResponse.data.daysff_dates.includes(item)
  //                   ? [holiday1, holiday2]
  //                   : [schools1, schools2],
  //               },
  //             };
  //           });
  //         });

  //         secondResponse.data.places_dates.forEach(item => {
  //           setPreviousDays(prev => {
  //             return {
  //               ...prev,
  //               [item]: {
  //                 // disabled: true,
  //                 // disableTouchEvent: true,
  //                 selected: selectedDay === item ? true : false,
  //                 selectedColor: '#7F05A3',
  //                 dots: [others1, others2],
  //               },
  //             };
  //           });
  //         });
  //       };
  //       getSchoolsPlaces();
  //     };

  //     getMonthlyPlans();
  //     // setPreviousDays(handlePreviousDays(previousDays));
  //   } else {
  //     let monthId = null;
  //     monthlyPlans?.forEach(item => {
  //       if (currentMonth == item.month) {
  //         monthId = item.id;
  //       }
  //     });

  //     //GET SCHOOLS & PLACES
  //     const getSchoolsPlaces = async () => {
  //       const token = await AsyncStorage.getItem('id_token');
  //       const secondResponse = await axios.get(
  //         `${API_URL}get/month/dates/details/`,
  //         {
  //           params: {
  //             month_id: monthId,
  //           },
  //           headers: {
  //             Authorization: `Token ${token}`,
  //           },
  //         },
  //       );

  //       // secondResponse.data.schools_dates.forEach(item => console.log('schools_dates', item));

  //       // secondResponse.data.schools_dates.forEach(item => {
  //       //   setPreviousDays(prev => {
  //       //     return {
  //       //       ...prev,
  //       //       [item]: {
  //       //         // disabled: true,
  //       //         // disableTouchEvent: true,
  //       //         dots: [schools1, schools2],
  //       //       },
  //       //     };
  //       //   });
  //       // });

  //       secondResponse.data.schools_dates.forEach(item => {
  //         setPreviousDays(prev => {
  //           return {
  //             ...prev,
  //             [item]: {
  //               disabled: secondResponse.data.daysff_dates.includes(item)
  //                 ? true
  //                 : false,
  //               disableTouchEvent: secondResponse.data.daysff_dates.includes(
  //                 item,
  //               )
  //                 ? true
  //                 : false,
  //               selected: selectedDay === item ? true : false,
  //               selectedColor: '#7F05A3',
  //               dots: secondResponse.data.daysff_dates.includes(item)
  //                 ? [holiday1, holiday2]
  //                 : [schools1, schools2],
  //             },
  //           };
  //         });
  //       });

  //       secondResponse.data.places_dates.forEach(item => {
  //         setPreviousDays(prev => {
  //           return {
  //             ...prev,
  //             [item]: {
  //               // disabled: true,
  //               // disableTouchEvent: true,
  //               dots: [others1, others2],
  //             },
  //           };
  //         });
  //       });
  //     };
  //     getSchoolsPlaces();
  //   }
  //   // setPreviousDays(handlePreviousDays(previousDays));
  // }, [currentMonth, currentYear]);

  useEffect(() => {
    placeDates.forEach(item => {
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

  // GET MONTHLY PLANS
  useEffect(() => {
    setIsLoading(true);
    // console.log(props.plan.destination);
    const getMonthlyPlans = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(
        `${API_URL}get/monthly/visits/plan/details/`,
        {
          params: {
            year: currentYear,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      setIsLoading(false);
      // console.log(response.data);
      setMonthlyPlans(response.data);
    };

    getMonthlyPlans();
  }, [currentYear]);

  const handleSelectDate = date => {
    // props.onCheckSelectedDate(new Date(date.dateString));
    setSelectedDay(date.dateString);
    // bs.current.snapTo(0);
    console.log(date);
  };

  const handleSelectPlan = (planDetailsMonth, planDetailsYear, screen) => {
    const planDetailsDate = {
      planDetailsMonth,
      planDetailsYear,
    };
    props.onSetPlanDetailsDate(planDetailsDate);
    // console.log(selectedMonth, selectedYear);
    switch (screen) {
      case 'details':
        navigation.navigate('PlaneDetails');
        break;
      case 'export':
        navigation.navigate('ExportPlan');
        break;
      case 'selection':
        navigation.navigate('MonthlyPlanSelection');
        break;
      default:
        break;
    }
  };

  const renderMonthlyPlans = ({item}) => (
    <Pressable
      onPress={() =>
        handleSelectPlan(
          `${item.month}`.replace(/^(\d)$/, '0$1').toString(),
          item.year.toString(),
          'details',
        )
      }>
      <HStack flex={1} style={{marginBottom: 25}}>
        <VStack style={{alignItems: 'center', width: '30%'}} space={2}>
          <Text style={[styles.loginBtn, {color: '#000', marginHorizontal: 5}]}>
            {format(new Date(item.start), 'MMM', {locale: ar})}
          </Text>
          <Divider
            orientation="vertical"
            maxHeight={'90%'}
            // height={'50%'}
            backgroundColor="rgba(0, 0, 0, 0.38)"
          />
        </VStack>
        <VStack width="60%" space={2}>
          <VStack
            space={2}
            style={{
              borderWidth: 1,
              // width: '85%',
              // height: '50%',
              borderRadius: 15,
              borderTopLeftRadius: 0,
              borderColor: 'rgba(0, 0, 0, 0.38)',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <HStack
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <HStack alignItems="center" space={1}>
                <Divider
                  orientation="vertical"
                  backgroundColor="rgba(255, 0, 0, 1)"
                  height={4}
                  width={0.5}
                />
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.black,
                      marginHorizontal: 5,
                      fontSize: 16,
                    },
                  ]}>
                  {format(new Date(item.start), 'MMM yyyy', {locale: ar})}
                </Text>
              </HStack>
              <Icon
                onPress={() =>
                  handleSelectPlan(
                    `${item.month}`.replace(/^(\d)$/, '0$1').toString(),
                    item.year.toString(),
                    'selection',
                  )
                }
                name={'fact-check'}
                type={'material'}
                color={colors.primary}
                size={22}
              />
            </HStack>
            <HStack alignItems="center">
              <Icon
                name={'calendar-month'}
                type={'material-community'}
                color={colors.dimGray}
                size={18}
              />
              <Text
                style={[
                  styles.loginBtn,
                  {
                    color: colors.dimGray,
                    marginHorizontal: 5,
                    fontWeight: 'normal',
                    fontSize: 15,
                  },
                ]}>
                {format(new Date(item?.start), 'dd/MM')} -{' '}
                {format(new Date(item?.end), 'dd/MM')}
              </Text>
            </HStack>
            <HStack>
              <Text
                style={[
                  styles.loginBtn,
                  {
                    color: colors.dimGray,
                    marginHorizontal: 5,
                    fontWeight: 'normal',
                    fontSize: 15,
                  },
                ]}>
                {item.duration} يوم
              </Text>
            </HStack>
          </VStack>
          <HStack style={{justifyContent: 'flex-end'}}>
            {/* <HStack alignItems="center">
              <Icon
                name={'edit'}
                type={'feather'}
                color={colors.primary}
                size={18}
              />
              <Text
                style={[
                  styles.loginBtn,
                  {
                    color: colors.primary,
                    marginHorizontal: 5,
                    fontSize: 12,
                  },
                ]}>
                تعديل
              </Text>
            </HStack> */}
            <Pressable
              onPress={() =>
                handleSelectPlan(
                  `${item.month}`.replace(/^(\d)$/, '0$1').toString(),
                  item.year.toString(),
                  'export',
                )
              }>
              <HStack alignItems="center">
                <Icon
                  name={'file-pdf'}
                  type={'material-community'}
                  color={colors.primary}
                  size={18}
                />
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.primary,
                      marginHorizontal: 5,
                      fontSize: 12,
                    },
                  ]}>
                  تصدير PDF
                </Text>
              </HStack>
            </Pressable>
            {/* <Pressable
              onPress={() =>
                handleSelectPlan(
                  `${item.month}`.replace(/^(\d)$/, '0$1').toString(),
                  item.year.toString(),
                  'export',
                )
              }>
              <HStack alignItems="center">
                <Icon
                  name={'share'}
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
                      fontSize: 12,
                    },
                  ]}>
                  مشاركة
                </Text>
              </HStack>
            </Pressable> */}
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <VStack
        style={{
          width: '95%',
          alignSelf: 'center',
          backgroundColor: colors.primary,
        }}>
        <Header
          //   containerStyle={{justifyContent: 'flex-end'}}
          backgroundColor="transparent"
          leftComponent={
            <Pressable
              style={styles.plusView}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Image
                source={images.menuBar1}
                style={{tintColor: colors.black}}
              />
            </Pressable>
          }
          // centerComponent={{
          //   text: 'اختر مقعدك',
          //   style: [
          //     {color: '#000', fontSize: 20, fontWeight: 'bold'},
          //     styles.address,
          //   ],
          // }}
          rightComponent={
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Avatar
                bg="cyan.500"
                // alignSelf="center"
                size={10}
                source={{uri: props.profile.image}}
                style={{padding: 10}}
                //   borderStyle=''
                borderWidth={2}
                borderColor="#10B1B1"
              />
            </Pressable>
          }
        />
        {/* CALENDAR */}
        <View style={{width: '100%', alignSelf: 'center'}}>
          <Calendar
            renderArrow={left =>
              left === 'left' ? (
                <Icon
                  name={'keyboard-arrow-right'}
                  type={'material'}
                  color={colors.white}
                />
              ) : (
                <Icon
                  name={'keyboard-arrow-left'}
                  type={'material'}
                  color={colors.white}
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
            onPressArrowLeft={
              subtractMonth => {
                //  console.log(isSameMonth(new Date(selectedMonth), subMonths(new Date(selectedMonth), 3)));
                //  console.log(new Date(selectedMonth));
                //  console.log(subMonths(new Date(), 3));
                isSameMonth(new Date(selectedMonth), subMonths(new Date(), 6))
                  ? null
                  : subtractMonth();
              }
              // isThisMonth(new Date(subMonths(new Date(selectedMonth), 3))) ? null : subtractMonth()
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
              ...previousDays,
            }}
            // headerStyle={{backgroundColor: '#FFF'}}
            theme={{
              selectedDayBackgroundColor: 'green',
              todayTextColor: 'green',
              arrowColor: 'green',
              calendarBackground: colors.primary,
              agendaDayTextColor: '#FFF',
              dayTextColor: '#FFF',
              monthTextColor: '#FFF',
              textDayStyle: {color: '#FFF'},
              agendaDayNumColor: '#FFF',
              textDayHeaderFontSize: 12,
              textDayFontSize: 20,
              //   textDefaultColor: '#FFF',
            }}
            style={{borderRadius: 7, width: '90%', alignSelf: 'center'}}
          />
        </View>
        {/* END CALENDAR */}
      </VStack>
      {/* Monthly Items */}
      <VStack
        // space={3}
        style={{
          backgroundColor: colors.white,
          flex: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 15,
          paddingVertical: 20,
        }}>
        {!isLoading && monthlyPlans.length > 0 ? (
          <FlatList
            data={monthlyPlans}
            keyExtractor={item => item.id}
            renderItem={renderMonthlyPlans}
          />
        ) : !isLoading && monthlyPlans.length === 0 ? (
          <Box
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text
              style={[
                styles.loginBtn,
                {
                  color: colors.dimGray,
                  marginHorizontal: 5,
                  fontSize: 14,
                  textAlign: 'left',
                },
              ]}>
              لا يوجد خطة في هذا الشهر
            </Text>
          </Box>
        ) : (
          <Box
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Spinner size="lg" />
          </Box>
        )}
        {/* Flatlist */}
      </VStack>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onSetPlanDetailsDate: planDetailsDate =>
    dispatch(setPlanDetailsDate(planDetailsDate)),
  // onPostCreateNote: (formData, navigateToTarget, regToast) =>
  //   dispatch(postCreateNote(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyVisitsPlane);
