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

const DriverHome = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [monthIndex, setMonthIndex] = useState(0);
  const [index, setIndex] = useState(0);

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

  // HANDLE SELECTED DAY
  const handleSelectDate = date => {
    // props.onCheckSelectedDate(new Date(date.dateString));
    setSelectedDay(date.dateString);
    // bs.current.snapTo(0);
    console.log(date.dateString);
  };

  const renderMonths = ({item}) => (
    <Pressable
      onPress={() => setMonthIndex(item.id - 1)}
      style={{
        width: wp('15%'),
        height: wp('20%'),
        backgroundColor:
          item.id - 1 === monthIndex ? colors.primary : colors.white,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={[
          styles.address3,
          {
            color: item.id - 1 === monthIndex ? colors.white : colors.primary,
            fontSize: 12,
          },
        ]}>
        {item.name}
      </Text>
    </Pressable>
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
          text: 'مرحبا محمد العبري',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        rightComponent={<Avatar source={images.avatar_new} size="sm" />}
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
      <Pressable onPress={() => navigation.navigate('DriverDetails')} style={[styles.btn]}>
        <Text style={styles.loginBtn}> عرض الخطة </Text>
      </Pressable>
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

export default connect(mapStateToProps, mapDispatchToProps)(DriverHome);
