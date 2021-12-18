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
  Alert,
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
  Divider,
  Spinner,
  useToast,
} from 'native-base';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import DashedLine from 'react-native-dashed-line';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {
  setNoteDate,
  uiStartLoading,
  uiStopLoading,
  postPlanDone,
  setNewPlace,
} from '../../redux/actions/Index';
import {API_URL} from '@env';

import {colors, images} from '../../config';
import styles from './styles';
import {Icon} from '../../components';
import SelectDropdown from 'react-native-select-dropdown';
import ConfirmModal from './ConfirmModal';
import ChooseLocation from './ChooseLocation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const Home = props => {
  const navigation = useNavigation();
  const toast = useToast();

  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'MM'));
  const [selectedYear, setSelectedYear] = useState(format(new Date(), 'yyyy'));
  const [months, setMonths] = useState([]);
  const [firstTime, setFirstTime] = useState(false);
  const [noPlans, setNoPlans] = useState(false);
  const [homeContent, setHomeContent] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stateSchool, setStateSchool] = useState([]);
  const [oldDestinationId, setOldDestinationId] = useState(null);
  const [newDestinationType, setNewDestinationType] = useState(1);
  const [destinationList, setDestinationList] = useState([]);

  // FAB
  const [locationIndex, setLocationIndex] = useState(0);

  // const months = ['Egypt', 'Canada', 'Australia', 'Ireland'];

  const plans = [
    {
      id: 1,
      planned: 'مدرسة السنينة',
      actual: '',
      date: 'أكتوبر ٤ , ٢٠٢١',
      day: 'الأحد',
      done: false,
    },
    {
      id: 2,
      planned: 'مدرسة محضة',
      actual: 'مدرسة محضة',
      date: 'أكتوبر ٥ , ٢٠٢١',
      day: 'الاثنين',
      done: true,
    },
    {
      id: 3,
      planned: 'مدرسة يزيد بن المهلب',
      actual: 'مدرسة السنينة',
      date: 'أكتوبر ٥ , ٢٠٢١',
      day: 'الثلاثاء',
      done: true,
    },
    {
      id: 4,
      planned: 'مدرسة يزيد بن المهلب',
      actual: 'مدرسة السنينة',
      date: 'أكتوبر ٦ , ٢٠٢١',
      day: 'الثلاثاء',
      done: true,
    },
  ];

  useEffect(() => {
    setHomeContent([]);
    setIsLoading(true);
    const getHomePage = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(`${API_URL}get/homepage/`, {
        params: {
          month: selectedMonth,
          year: selectedYear,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data.results);
      if (response.data.count === 0) {
        setIsLoading(false);
        setNoPlans(true);
      } else {
        setIsLoading(false);
        setNoPlans(false);
        setHomeContent(response.data.results);
      }
    };
    getHomePage();

    // GET MONTHS THIS YEAR
    const monthsText = [
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
    ];
    let newMonths = [];
    for (let x in monthsText) {
      newMonths.push(monthsText[x] + ' ' + selectedYear);
    }
    setMonths(newMonths);
  }, [selectedMonth, props.reload]);

  // GET SCHOOL STATES
  useEffect(() => {
    // GET STATE SCHOOL
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
      setDestinationList(response.data.places);
      // console.log(response.data);
    };

    getStateSchool();
  }, []);

  const createPDF = async () => {
    let options = {
      html: '<table><tr><th>Firstname</th><th>Lastname</th></tr></table>',
      fileName: 'plan_' + selectedMonth + '_' + selectedYear,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // RNFS.moveFile(file.filePath, RNFS.DownloadDirectoryPath + '/test2.pdf')
    //   .then(success => {
    //     console.log('file moved!');
    //   })
    //   .catch(err => {
    //     console.log('Error: ' + err.message);
    //   });
    console.log(file.filePath);
    Alert.alert('تم تصدير الملف بنجاح إلى الموقع التالي', file.filePath);
    // alert(file.filePath);
    // alert(RNFS.DownloadDirectoryPath + '/test2.pdf');
  };

  const handleAddNote = date => {
    console.log(date);
    props.onSetNoteDate(date);
    navigation.navigate('AddNote');
  };

  const handlePlanDone = (destination, done) => {
    // console.log(destination);
    // console.log(done);
    // props.onUiStartLoading();
    const formData = new FormData();
    formData.append('destination', destination);
    formData.append('done', done);
    props.onPostPlanDone(formData, toast);
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

  // HANDLE SELECT STATE MODAL FOR PLAN NOT DONE
  const handleSelectStateModal = () => {
    setShowModal(false);
    const placeData = {
      destination: oldDestinationId,
      done: 0,
      new_destination_type: newDestinationType,
      destinationList: destinationList, // For next screen
    };
    props.onSetNewPlace(placeData);
    navigation.navigate('ChooseSchool');
  }

  // RENDER SCHOOL STATES FOR FLATLIST
  const renderStates = ({item}) => (
    // <VStack space={2} alignItems="center" width="20%">
    //   <FAB
    //     onPress={() => setLocationIndex(item.id)}
    //     size="small"
    //     icon={
    //       <Image
    //         style={{width: wp('5%'), height: wp('5%')}}
    //         source={images.awesome_school}
    //       />
    //     }
    //     color="#9FD49D"
    //     style={{
    //       borderWidth: locationIndex === item.id ? 2 : 0,
    //       borderColor: colors.primary,
    //       borderRadius: wp('50%'),
    //     }}
    //     //   onPress={() => setChooseSchool(true)}
    //   />
    //   <Text
    //     style={[
    //       styles.loginBtn,
    //       {
    //         color: colors.black,
    //         marginHorizontal: 5,
    //         fontSize: 10,
    //         textAlign: 'center',
    //       },
    //     ]}>
    //     {item.name}
    //   </Text>
    // </VStack>
    <VStack space={2} alignItems="center" style={{marginHorizontal: 5}}>
      <FAB
        size='small'
        icon={<Image style={styles.img} source={images.awesome_school} />}
        color="#9FD49D"
        onPress={() => {
          setLocationIndex(item.id); // TO SHOW BORDER FOR SELECTED STATE
          setNewDestinationType(0);
          setDestinationList(item.schools);
        }}
        style={{
                borderWidth: locationIndex === item.id ? 2 : 0,
                borderColor: colors.primary,
                borderRadius: wp('50%'),
              }}
      />
      <Text style={{color: '#000'}}>{item.name}</Text>
    </VStack>
  );

  // RENDER HOME ITEMS
  const renderItem = ({item}) => (
    <Pressable>
      <HStack flex={1} style={{marginBottom: 10}}>
        {/* RIGHT SIDE START */}
        <VStack style={{alignItems: 'center', width: '30%'}} space={2}>
          <Box
            style={{
              backgroundColor: 'rgba(159, 212, 157, 0.45)',
              padding: 10,
              borderRadius: 50,
            }}>
            <Icon
              name={'calendar-month'}
              type={'material-community'}
              color={'#79AF77'}
              size={25}
            />
          </Box>
          <Text style={[styles.loginBtn, {color: '#000', marginHorizontal: 5}]}>
            {format(new Date(item.date), 'eeee', {locale: ar})}
          </Text>
          <DashedLine
            style={{height: hp('7%')}}
            axis="vertical"
            dashLength={10}
            dashThickness={2}
            dashGap={7}
            dashColor={colors.dimGray}
          />
        </VStack>
        {/* RIGHT SIDE FINISH */}
        {/* LEFT SIDE START */}
        <VStack width="60%" space={2}>
          <HStack
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.loginBtn,
                {
                  color: colors.black,
                  marginHorizontal: 5,
                  fontSize: 16,
                },
              ]}>
              {format(new Date(item.date), 'dd MMM yyyy', {locale: ar})}
            </Text>
            <Pressable onPress={() => handleAddNote(item.date)}>
              <Icon
                name={'file-plus'}
                type={'material-community'}
                color={colors.primary}
                size={25}
              />
            </Pressable>
          </HStack>
          <VStack
            space={2}
            style={{
              // borderWidth: 1,
              // width: '85%',
              // height: '50%',
              backgroundColor: colors.lightGrey,
              borderRadius: 15,
              borderTopLeftRadius: 0,
              borderColor: 'rgba(0, 0, 0, 0.38)',
              paddingHorizontal: 20,
              paddingVertical: 15,
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
                      fontSize: 14,
                    },
                  ]}>
                  {item.destinations[0]?.destination_details?.name || 'لا يوجد'}
                </Text>
              </HStack>
              <Pressable
                onPress={() => navigation.navigate('SchoolLocation')}
                style={{
                  backgroundColor: colors.white,
                  padding: 3,
                  borderRadius: 50,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}>
                <Icon
                  name={'location-pin'}
                  type={'material'}
                  color={colors.primary}
                  size={20}
                />
              </Pressable>
            </HStack>
            {item.destinations[0]?.can_confirm ? (
              <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center">
                  <Pressable
                    onPress={() => handlePlanDone(item.destinations[0].id, 1)}
                    style={styles.icons}>
                    <Icon
                      name={'check'}
                      type={'material-community'}
                      color={colors.primary}
                      size={18}
                    />
                  </Pressable>
                  <Text
                    style={[
                      styles.loginBtn,
                      {
                        color: colors.dimGray,
                        marginHorizontal: 5,
                        fontWeight: 'normal',
                        fontSize: 12,
                      },
                    ]}>
                    تم التنفيذ
                  </Text>
                </HStack>
                <HStack alignItems="center">
                  <Pressable
                    style={styles.icons}
                    onPress={() => {
                      setOldDestinationId(item.destinations[0].id);
                      setShowModal(true);
                    }}>
                    <Icon
                      name={'reload'}
                      type={'ionicon'}
                      color={colors.primary}
                      size={15}
                    />
                  </Pressable>
                  <Text
                    style={[
                      styles.loginBtn,
                      {
                        color: colors.dimGray,
                        marginHorizontal: 5,
                        fontWeight: 'normal',
                        fontSize: 12,
                      },
                    ]}>
                    لم يتم التنفيذ
                  </Text>
                </HStack>
              </HStack>
            ) : (
              <HStack>
                <Icon
                  name={'check'}
                  type={'material'}
                  color={colors.primary}
                  size={15}
                />
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.dimGray,
                      marginHorizontal: 5,
                      fontWeight: 'normal',
                      fontSize: 14,
                    },
                  ]}>
                  {item.destinations[0]?.destination_details?.name || 'لا يوجد'}
                </Text>
              </HStack>
            )}
          </VStack>
        </VStack>
        {/* LEFT SIDE FINISH */}
      </HStack>
    </Pressable>
  );

  return (
    <View flex={1} style={{backgroundColor: colors.white}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      {/* <Box safeArea style={{backgroundColor: colors.dimGray}} /> */}
      <VStack
        space={4}
        style={{
          width: '100%',
          //   height: '10%',
          paddingHorizontal: wp('5%'),
          justifyContent: 'flex-start',
          // alignSelf: 'flex-start',
          //   alignSelf: 'center',
          backgroundColor: colors.primary,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Header
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
          centerComponent={{
            text: `مرحبا بك ${props.profile.full_name}`,
            style: [
              {color: '#FFF', fontSize: 20, fontWeight: 'bold'},
              styles.address,
            ],
          }}
          rightComponent={
            <Pressable onPress={() => console.log(props.profile)}>
              <Avatar
                bg="cyan.500"
                // alignSelf="center"
                size={10}
                source={{uri: props.profile.image}}
                // source={images.my_avatar}
                style={{padding: 10}}
                //   borderStyle=''
                borderWidth={2}
                borderColor="#10B1B1"
              />
            </Pressable>
          }
        />
        <HStack
          style={{alignItems: 'center', justifyContent: 'space-between'}}
          paddingX={2}
          paddingBottom={4}>
          <HStack alignItems="center">
            <Pressable onPress={() => navigation.navigate('AddPlane')}>
              <Icon
                name={'circle-with-plus'}
                type={'entypo'}
                color={'#FFF'}
                size={30}
              />
            </Pressable>
            <Text
              style={[
                styles.loginBtn,
                {color: '#FFF', marginHorizontal: 5, fontSize: 18},
              ]}>
              ادخال خطة جديدة
            </Text>
          </HStack>
          {!firstTime ? (
            <Pressable onPress={() => navigation.navigate('EditPlane')}>
              <Box
                padding={2}
                style={{
                  backgroundColor: 'rgba(210, 220, 220, 0.42)',
                  borderRadius: 50,
                }}>
                <Icon
                  name={'edit'}
                  type={'feather'}
                  color={colors.white}
                  size={18}
                />
              </Box>
            </Pressable>
          ) : null}
        </HStack>
      </VStack>

      {/* MAIN BODY START */}
      {!firstTime ? (
        <VStack flex={1} marginTop={3}>
          <HStack
            marginTop={1}
            marginBottom={5}
            style={{backgroundColor: 'transparent', alignSelf: 'center'}}>
            <View style={styles.sideHeader}>
              <Pressable style={styles.plusView1} onPress={createPDF}>
                <Icon
                  name={'file-pdf'}
                  type={'material-community'}
                  color={colors.white}
                  size={20}
                />
              </Pressable>
              <View>
                <Text style={[styles.address, {color: colors.primary}]}>
                  خطتك لهذا الشهر
                </Text>
              </View>
            </View>
            <View style={styles.superVisorHeader3}>
              <SelectDropdown
                data={months}
                defaultButtonText={format(new Date(), 'MMM yyyy', {locale: ar})}
                buttonTextStyle={{fontSize: 15}}
                dropdownIconPosition="right"
                renderDropdownIcon={() => (
                  <Icon name="keyboard-arrow-down" type="material" />
                )}
                buttonStyle={{
                  width: 140,
                  backgroundColor: colors.lightGrey,
                  borderRadius: 8,
                  height: 40,
                }}
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                  setSelectedMonth(index + 1);
                  console.log(index + 1, selectedYear);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
          </HStack>

          {isLoading ? (
            <Spinner style={{alignSelf: 'center', flex: 1}} size="lg" />
          ) : noPlans ? (
            <VStack
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text style={[styles.address, {color: colors.primary}]}>
                لا يوجد أي خطة في هذا الشهر
              </Text>
            </VStack>
          ) : (
            <FlatList
              data={homeContent}
              // keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          )}

          {/* {noPlans ? (
            <VStack
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text style={[styles.address, {color: colors.primary}]}>
                لا يوجد أي خطة في هذا الشهر
              </Text>
            </VStack>
          ) : (
            <FlatList
              data={homeContent}
              // keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          )} */}
        </VStack>
      ) : (
        <VStack
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.img} source={images.empty_home} />
          <Text
            style={[
              styles.address,
              {
                color: colors.black,
                width: '70%',
                textAlign: 'center',
                marginTop: hp('10%'),
              },
            ]}>
            يرجى ادخال خطتك لتتمكن من عرضها او التعديل عليها
          </Text>
          <Pressable onPress={() => alert('ds')} style={styles.btn}>
            <Text style={styles.loginBtn}> ادخال خطة جديدة</Text>
          </Pressable>
        </VStack>
      )}

      {/* MAIN BODY FINISH */}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{alignItems: 'center'}}>
            تحديد المكان
          </Modal.Header>
          <Modal.Body>
            <HStack
              style={{
                justifyContent: 'space-evenly',
                width: '95%',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <Box style={{width: '75%'}}>
                <FlatList
                  horizontal
                  data={stateSchool?.states}
                  keyExtractor={item => item.id}
                  renderItem={renderStates}
                  // style={{marginHorizontal: 5}}
                />
              </Box>
              {/* <VStack space={2} alignItems="center" width="20%">
                <FAB
                  onPress={() => setLocationIndex(1)}
                  size="small"
                  icon={
                    <Image
                      style={{width: wp('5%'), height: wp('5%')}}
                      source={images.awesome_school}
                    />
                  }
                  color="#9FD49D"
                  style={{
                    borderWidth: locationIndex === 1 ? 2 : 0,
                    borderColor: colors.primary,
                  }}
                  //   onPress={() => setChooseSchool(true)}
                />
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.black,
                      marginHorizontal: 5,
                      fontSize: 10,
                      textAlign: 'center',
                    },
                  ]}>
                  مدارس البريمي
                </Text>
              </VStack>
              <VStack space={2} alignItems="center" width="20%">
                <FAB
                  onPress={() => setLocationIndex(2)}
                  size="small"
                  icon={
                    <Image style={styles.img} source={images.mahada_school} />
                  }
                  color="#DEC8E5"
                  style={{
                    borderWidth: locationIndex === 2 ? 2 : 0,
                    borderColor: colors.primary,
                  }}
                  //   onPress={() => setChooseSchool(true)}
                  // color="rgba(127, 5, 163, 0.2)"
                />
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.black,
                      marginHorizontal: 5,
                      fontSize: 10,
                      textAlign: 'center',
                    },
                  ]}>
                  مدارس محضة
                </Text>
              </VStack>
              <VStack space={2} alignItems="center" width="20%">
                <FAB
                  onPress={() => setLocationIndex(3)}
                  size="small"
                  icon={
                    <Image style={styles.img} source={images.sanena_school} />
                  }
                  color="#E6B9A9"
                  style={{
                    borderWidth: locationIndex === 3 ? 2 : 0,
                    borderColor: colors.primary,
                  }}
                  //   onPress={() => setChooseSchool(true)}
                />
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.black,
                      marginHorizontal: 5,
                      fontSize: 10,
                      textAlign: 'center',
                    },
                  ]}>
                  مدارس السنية
                </Text>
              </VStack> */}
              <VStack space={2} alignItems="center">
                <FAB
                  size="small"
                  icon={
                    <Icon name={'add'} type={'material'} color={'#837777'} />
                  }
                  color="#CACACA"
                  onPress={() => {
                    setLocationIndex(0);
                    setNewDestinationType(1);
                    setDestinationList(stateSchool?.places);
                  }}
                  style={{
                    borderWidth: locationIndex === 0 ? 2 : 0,
                    borderColor: colors.primary,
                  }}
                />
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.black,
                      marginHorizontal: 5,
                      fontSize: 10,
                      textAlign: 'center',
                    },
                  ]}>
                  {' '}
                  أخرى{' '}
                </Text>
              </VStack>
            </HStack>
            <Pressable
              onPress={handleSelectStateModal}
              style={[styles.btn, {width: 220, marginTop: '10%'}]}>
              <Text style={styles.loginBtn}> اختيار</Text>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {/* <ConfirmModal
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
        onAddNote={() => {
          navigation.navigate('AddNote');
          setVisible(false);
        }}
      />
      <ChooseLocation
        visible={locationVisible}
        onRequestClose={() => {
          setlLocationVisible(false);
          navigation.navigate('ChooseSchool');
        }}
      /> */}
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  reload: state.ui.reload,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onSetNoteDate: date => dispatch(setNoteDate(date)),
  onPostPlanDone: (formData, toast) => dispatch(postPlanDone(formData, toast)),
  onSetNewPlace: (data) => dispatch(setNewPlace(data)),
  onUiStartLoading: () => dispatch(uiStartLoading()),
  onUiStopLoading: () => dispatch(uiStopLoading()),
  // onPostLogin: (loginData, navigateToTarget, toast) => dispatch(postLogin(loginData, navigateToTarget, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
