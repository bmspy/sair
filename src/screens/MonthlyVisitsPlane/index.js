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
} from 'date-fns';

const MonthlyVisitsPlane = props => {
  const navigation = useNavigation();

  // PLAN DETAILS DATE
  const [planDetailsMonth, setPlanDetailsMonth] = useState(
    format(new Date(), 'MM'),
  );
  const [planDetailsYear, setPlanDetailsYear] = useState(
    format(new Date(), 'yyyy'),
  );

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

  useEffect(() => {
    setPreviousDays(handlePreviousDays(previousDays));
  }, []);

  // GET DAYSOFF
  useEffect(() => {
    // console.log(props.plan.destination);
    const getDaysoff = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(
        `${API_URL}get/month/daysoff/`,
        {
          params: {
            month: currentMonth,
            year: currentYear,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      console.log(response.data.map(item => item.date));
      setDaysoff(response.data.map(item => item.date));

      response.data
        .map(item => item.date)
        .forEach(item => {
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
    };

    getDaysoff();
  }, [currentMonth, currentYear]);

  const handleSelectDate = date => {
    // props.onCheckSelectedDate(new Date(date.dateString));
    setSelectedDay(date.dateString);
    // bs.current.snapTo(0);
    console.log(date);
  };

  const handleSelectPlan = () => {
    const planDetailsDate = {
      planDetailsMonth,
      planDetailsYear,
    };
    props.onSetPlanDetailsDate(planDetailsDate);
    navigation.navigate('PlaneDetails');
  };

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
                source={images.my_avatar}
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
              '2021-12-13': {
                dots: [schools1, schools2],
                selected: selectedDay === '2021-12-13' ? true : false,
                // marked: true,
                selectedColor: '#7F05A3',
              },
              '2021-12-22': {
                dots: [schools1, schools2],
                selected: selectedDay === '2021-12-22' ? true : false,
                selectedColor: '#7F05A3',
              },
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
        {/* Flatlist */}
        <FlatList
          data={[{}, {}, {}, {}]}
          renderItem={(p, i) => {
            return (
              <Pressable key={i} onPress={handleSelectPlan}>
                <HStack flex={1} style={{marginBottom: 25}}>
                  <VStack
                    style={{alignItems: 'center', width: '30%'}}
                    space={2}>
                    <Text
                      style={[
                        styles.loginBtn,
                        {color: '#000', marginHorizontal: 5},
                      ]}>
                      أكتوبر
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
                            أكتوبر ٢٠٢١
                          </Text>
                        </HStack>
                        <Icon
                          onPress={() =>
                            navigation.navigate('MonthlyPlanSelection')
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
                          1/10 - 31/10
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
                          ٢٠ يوم
                        </Text>
                      </HStack>
                    </VStack>
                    <HStack style={{justifyContent: 'space-between'}}>
                      <HStack alignItems="center">
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
                      </HStack>
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
                    </HStack>
                  </VStack>
                </HStack>
              </Pressable>
            );
          }}
        />
      </VStack>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onSetPlanDetailsDate: (planDetailsDate) => dispatch(setPlanDetailsDate(planDetailsDate))
  // onPostCreateNote: (formData, navigateToTarget, regToast) =>
  //   dispatch(postCreateNote(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyVisitsPlane);
