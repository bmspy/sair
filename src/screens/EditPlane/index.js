import React, {useState} from 'react';
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
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Tab, TabView, FAB, Header} from 'react-native-elements';
import {VStack, HStack, Modal, Box, Radio} from 'native-base';
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScrollPicker from 'react-native-scroll-picker-wheel';

const EditPlane = props => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  //CALENDAR
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayToSave, setSelectedDayToSave] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const [previousDays, setPreviousDays] = useState({});
  const [chooseSchool, setChooseSchool] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [radioValue, setRadioValue] = React.useState('مدرسة الطلائع');

  LocaleConfig.locales.ar = {
    monthNames: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    monthNamesShort: [
      'Janv.',
      'Févr.',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juil.',
      'Août',
      'Sept.',
      'Oct.',
      'Nov.',
      'Déc.',
    ],
    dayNames: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ],
    dayNamesShort: [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = 'ar';

  const handleSelectDate = date => {
    // props.onCheckSelectedDate(new Date(date.dateString));
    setSelectedDay(date.dateString);
    // bs.current.snapTo(0);
    console.log(date);
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
          <Pressable onPress={() => navigation.navigate('PlaneDetails')}>
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
          markedDates={{
            [selectedDay]: {
              selected: true,
              marked: true,
              selectedColor: 'red',
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
              backgroundColor: 'green',
            }}
          />
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 7,
              backgroundColor: 'green',
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
            onPress={() => navigation.navigate('AddPlane')}
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
            onPress={() => setShowModal(true)}
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
        {!chooseSchool ? (
          <HStack
            style={{
              justifyContent: 'space-evenly',
              width: '95%',
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <VStack space={2} alignItems="center">
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
            <VStack space={2} alignItems="center">
              <FAB
                icon={<Icon name={'add'} type={'material'} color={'#837777'} />}
                color="#CACACA"
                onPress={() => setChooseSchool(true)}
              />
              <Text style={{color: '#000'}}> أخرى </Text>
            </VStack>
          </HStack>
        ) : (
          <VStack height="140">
            <ScrollPicker
              dataSource={[
                'مدرسة عزان',
                'مدرسة الطلائع',
                'مدرسة المجد',
                'مدرسة الخوارزمي',
              ]}
              selectedIndex={1}
              renderItem={(data, index, isSelected) => {
                console.log(isSelected);
                //
              }}
              onValueChange={(data, selectedIndex) => {
                console.log('index: ', selectedIndex);
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
        )}

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
        {/* <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
            marginBottom: Platform.OS === 'android' ? 20 : 0,
          }}>
          {chooseSchool ? (
            <Pressable onPress={() => setShowModal(true)} style={styles.btn}>
              <Text style={styles.loginBtn}> التالي </Text>
            </Pressable>
          ) : null}
        </View> */}
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{alignItems: 'center'}}>
            استبدل المدرسة
          </Modal.Header>
          <Modal.Body>
            <Radio.Group
            style={{ paddingHorizontal: '10%'}}
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={radioValue}
              onChange={nextValue => {
                setRadioValue(nextValue);
              }}>
              <Radio value="مدرسة الطلائع" my={1}>
              مدرسة الطلائع
              </Radio>
              <Radio value="مدرسة المجد" my={1}>
              مدرسة المجد
              </Radio>
            </Radio.Group>
            <Pressable
              onPress={() => {
                setShowModal(false);
                navigation.navigate('AddPlane');
              }}
              style={[styles.btn, {width: 220, marginTop: '5%'}]}>
              <Text style={styles.loginBtn}> استبدال</Text>
            </Pressable>
          </Modal.Body>
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

export default EditPlane;
