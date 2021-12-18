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
} from 'react-native';
import {Icon} from '../../components';
import {colors, images} from '../../config';
import GoMethod from './GoMethod';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
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
} from 'date-fns';
import {ar} from 'date-fns/locale';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScrollPicker from 'react-native-scroll-picker-wheel';
import {connect} from 'react-redux';
import {createPlan, setPlan} from '../../redux/actions/Index';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {handlePreviousDays, arabicMonths, dotColors} from '../../services/calendar';
import {API_URL} from '@env';

const AddPlane = props => {
  const [destination, setDestination] = useState(null);
  const navigation = useNavigation();
  const toast = useToast();

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

  //SCHOOLS
  const [stateSchool, setStateSchool] = useState([]);
  const [selectedStateSchool, setSelectedStateSchool] = useState({});
  const [chooseSchool, setChooseSchool] = useState(false);
  const [chooseOthers, setChooseOthers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [schoolName, setSchoolName] = useState(null);

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

    // GET CURRENT MONTH & YEAR
    setCurrentMonth(format(new Date(), 'MM'));
    setCurrentYear(format(new Date(), 'yyyy'));

    getStateSchool();
  }, []);

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

  LocaleConfig.locales.ar = arabicMonths;
  LocaleConfig.defaultLocale = 'ar';

  // HANDLE SELECTED DAY
  const handleSelectDate = date => {
    // props.onCheckSelectedDate(new Date(date.dateString));
    setSelectedDay(date.dateString);
    // bs.current.snapTo(0);
    console.log(date.dateString);
  };

  // HANDLE SELECT SCHOOL STATE
  const handleSelectStateSchool = item => {
    setSelectedStateSchool(item);
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
    };
    if (method === 1) {
      // console.log('driver here');
      setShowModal(false);
      props.onSetPlan(plan);
      navigation.navigate('ChooseYourSeat');
    } else {
      props.onCreatePlan(formData, navigation.navigate, toast);
      // navigation.navigate('SchoolRoute');
    }
  };

  // RENDER SCHOOL STATES FOR FLATLIST
  const renderStates = ({item}) => (
    <VStack space={2} alignItems="center" style={{marginHorizontal: 5}}>
      <FAB
        icon={<Image style={styles.img} source={images.awesome_school} />}
        color="#9FD49D"
        onPress={() => handleSelectStateSchool(item)}
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
        // rightComponent={{icon: 'home', color: '#000'}}
      />
      {/* CALENDAR */}
      <View style={{width: '100%', alignSelf: 'center'}}>
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
              selectedColor: '#7F05A3',
            },
            '2021-12-13': {
              dots: [schools1, schools2],
              selected: selectedDay === '2021-12-13' ? true : false,
              // marked: true,
              selectedColor: '#7F05A3',
            },
            '2021-12-22': {dots: [schools1, schools2], selected: selectedDay === '2021-12-22' ? true : false, selectedColor: '#7F05A3',},
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
                onPress={() => setChooseOthers(true)}
              />
              <Text style={{color: '#000'}}> أخرى </Text>
            </VStack>
          </HStack>
        ) : !chooseOthers && chooseSchool ? (
          <VStack height="140">
            <ScrollPicker
              dataSource={selectedStateSchool?.schools.map(item => item.name)}
              selectedIndex={1}
              renderItem={(data, index, isSelected) => {
                // console.log(isSelected);
                //
              }}
              onValueChange={(data, selectedIndex) => {
                // console.log('index: ', data);
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
                console.log('index: ', selectedIndex);
                stateSchool?.places.forEach(item => {
                  if (item.name === data) {
                    setDestination(item.id);
                  }
                });
                setDestination(selectedIndex);
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
            <Pressable
              onPress={() =>
                chooseSchool ? setShowModal(true) : handleSetPlan(0)
              }
              style={styles.btn}>
              <Text style={styles.loginBtn}> التالي </Text>
            </Pressable>
          ) : (
            <Pressable style={[styles.btn, {backgroundColor: '#8B9494'}]}>
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
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onCreatePlan: (plan, navigateToTarget, toast) =>
    dispatch(createPlan(plan, navigateToTarget, toast)),
  onSetPlan: plan => dispatch(setPlan(plan)),
  // onPostCreateNote: (formData, navigateToTarget, regToast) =>
  //   dispatch(postCreateNote(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlane);
