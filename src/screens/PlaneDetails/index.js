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
  Alert,
} from 'react-native';
import {Tab, TabView, Card, Header} from 'react-native-elements';
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
import {colors, images} from '../../config';
import styles from './styles';
import {Icon} from '../../components';
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
import {ar} from 'date-fns/locale'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {} from '../../redux/actions/Index';
import {API_URL} from '@env';

const PlaneDetails = props => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [planDetailsData, setPlanDetailsData] = useState({});

  const plans = [
    {
      date: 'الأحد ١',
      school: 'مدرسة ١',
      method: 'سائق',
    },
    {
      date: 'الاثنين ٢',
      school: 'مدرسة ٢',
      method: 'سيارة خاصة',
    },
    {
      date: 'الثلاثاء ٣',
      school: 'مدرسة ٣',
      method: 'سائق',
    },
    {
      date: 'الأربعاء ٤',
      school: 'مدرسة ٤',
      method: 'سائق',
    },
    {
      date: 'الخميس ٥',
      school: 'مدرسة ٥',
      method: 'سائق',
    },
    {
      date: 'الأحد ٨',
      school: 'مكتب ١',
      method: 'سيارة خاصة',
    },
    {
      date: 'الاثنين ٩',
      school: 'عمل خارجي',
      method: 'سيارة خاصة',
    },
  ];

  useEffect(() => {
    const getPlanDetails = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(
        `${API_URL}get/plan/details/`,
        {
          params: {
            month: props.planDetailsDate.planDetailsMonth,
            year: props.planDetailsDate.planDetailsYear,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      setPlanDetailsData(response.data);
    };

    getPlanDetails();
  }, []);

  // const createPDF = async () => {
  //   let options = {
  //     html: '<table><tr><th>Firstname</th><th>Lastname</th></tr></table>',
  //     fileName: 'plan_' + format(new Date(), 'MM_yyyy'),
  //     directory: 'Documents',
  //   };

  //   let file = await RNHTMLtoPDF.convert(options);
  //   // RNFS.moveFile(file.filePath, RNFS.DownloadDirectoryPath + '/test2.pdf')
  //   //   .then(success => {
  //   //     console.log('file moved!');
  //   //   })
  //   //   .catch(err => {
  //   //     console.log('Error: ' + err.message);
  //   //   });
  //   console.log(file.filePath);
  //   Alert.alert('تم تصدير الملف بنجاح إلى الموقع التالي', file.filePath);
  //   // alert(file.filePath);
  //   // alert(RNFS.DownloadDirectoryPath + '/test2.pdf');
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Box safeArea />
      <Card containerStyle={{borderRadius: 15}}>
        <VStack>
          {/* Header Start */}
          <HStack
            style={{
              justifyContent: 'space-between',
              width: '100%',
              paddingTop: 10,
              paddingBottom: 15,
            }}>
            <HStack space={2} alignItems="center">
              <Pressable
                onPress={() => navigation.navigate('MonthlyVisitsPlane')}>
                <Icon
                  name={'keyboard-arrow-right'}
                  type={'material'}
                  color={colors.dimGray}
                  size={22}
                />
              </Pressable>
              <Text
                style={[
                  styles.loginBtn,
                  {
                    color: colors.dimGray,
                    marginHorizontal: 5,
                    fontSize: 16,
                  },
                ]}>
                تفاصيل الخطة
              </Text>
            </HStack>
            <Pressable onPress={() => navigation.navigate('EditPlane')}>
              <HStack space={2} alignItems="center">
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
                      fontSize: 14,
                    },
                  ]}>
                  تعديل
                </Text>
              </HStack>
            </Pressable>
          </HStack>
          {/* Header Finish */}
          <Card.Divider style={{marginVertical: 10}} />
          {/* Body Start */}
          {/* Duration Start */}
          <ScrollView>
            <VStack space={4} style={{marginVertical: 10}}>
              <HStack style={{justifyContent: 'space-around'}}>
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.primary,
                      marginHorizontal: 5,
                      fontSize: 14,
                    },
                  ]}>
                  الشهر
                </Text>
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.primary,
                      marginHorizontal: 5,
                      fontSize: 14,
                    },
                  ]}>
                  المدة
                </Text>
              </HStack>
              <HStack style={{justifyContent: 'space-around'}}>
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.dimGray,
                      marginHorizontal: 5,
                      fontSize: 14,
                    },
                  ]}>
                  {format(new Date(`${props.planDetailsDate.planDetailsYear}-${props.planDetailsDate.planDetailsMonth}`), 'MMM', {locale: ar})}
                </Text>
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.dimGray,
                      marginHorizontal: 5,
                      fontSize: 14,
                    },
                  ]}>
                  {planDetailsData.duration} يوم
                </Text>
              </HStack>
            </VStack>
            {/* Duration Finish */}
            {/* Table Start */}
            <VStack
              style={{
                marginTop: 10,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: colors.primary,
                paddingBottom: 5,
              }}>
              {/* Table Head Start */}
              <HStack
                style={{
                  justifyContent: 'space-between',
                  // borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: colors.primary,
                  paddingVertical: 10,
                }}>
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.black,
                      marginHorizontal: 5,
                      fontSize: 14,
                    },
                  ]}>
                  التاريخ
                </Text>
                <VStack
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    //   backgroundColor: 'gray',
                    width: '100%',
                    position: 'absolute',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      styles.loginBtn,
                      {
                        color: colors.black,
                        marginHorizontal: 5,
                        fontSize: 14,
                      },
                    ]}>
                    المدرسة
                  </Text>
                </VStack>
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.black,
                      marginHorizontal: 5,
                      fontSize: 14,
                    },
                  ]}>
                  طريقة الذهاب
                </Text>
              </HStack>
              {/* Table Head End */}
              {/* Table Body Start */}
              {
              planDetailsData?.plans ?
              planDetailsData?.plans?.map((p, i) => (
                <HStack
                  key={i}
                  style={{
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingVertical: 5,
                  }}>
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
                    {format(new Date(p.date), 'd eeee', {locale: ar})}
                  </Text>
                  <VStack
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      //   backgroundColor: 'gray',
                      width: '100%',
                      position: 'absolute',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        styles.loginBtn,
                        {
                          color: colors.dimGray,
                          marginHorizontal: 5,
                          fontSize: 14,
                          textAlign: 'left',
                          flex: 1,
                        },
                      ]}>
                      {p.destination_name}
                    </Text>
                  </VStack>

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
                    {p.go_method ? 'سائق' : 'سيارة خاصة'}
                  </Text>
                </HStack>
              )) : (<Spinner style={{marginVertical: 50}} size='lg' />)}
              {/* Table Body Finish */}
            </VStack>
            {/* Table Finish */}

            <VStack space={3} style={{marginTop: 15}}>
              <HStack>
                <Text
                  style={[
                    styles.loginBtn,
                    {
                      color: colors.primary,
                      marginHorizontal: 5,
                      fontSize: 14,
                      textAlign: 'left',
                    },
                  ]}>
                  التفاصيل
                </Text>
              </HStack>
              <HStack>
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
                  هذه الخطة الشهرية للمشرف في انتظار اعتماد مدير الدائرة.
                </Text>
              </HStack>
              {/* Button */}
              <Pressable
                onPress={() => setShowModal(true)}
                style={[styles.btn, {width: '70%', marginVertical: '5%'}]}>
                <HStack
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  space={2}>
                  {/* <Icon name={'lock'} type={'material'} size={20} color="#FFF" /> */}
                  <Text style={styles.loginBtn}> اعتماد رئيس القسم </Text>
                </HStack>
              </Pressable>

              {/* <Pressable
                onPress={createPDF}
                style={[styles.btn, {width: '70%', marginVertical: '5%'}]}>
                <HStack
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.loginBtn}> Print PDF </Text>
                </HStack>
              </Pressable> */}
            </VStack>
          </ScrollView>
          {/* Body Finish */}
        </VStack>
      </Card>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
              تم انشاء خطتك الشهرية بنجاح في انتظار اعتماد رئيس القسم
            </Text>
            <Icon
              name={'check-circle'}
              type={'material'}
              color={colors.primary}
              size={wp('18%')}
            />
            <HStack justifyContent="center" space={5}>
              {/* Button */}
              <Pressable
                onPress={() => {
                  setShowModal(false);
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
    </View>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  planDetailsDate: state.plan.planDetailsDate,
});

const mapDispatchToProps = dispatch => ({
  // onSetPlanDetailsDate: (planDetailsDate) => dispatch(setPlanDetailsDate(planDetailsDate))
  // onPostCreateNote: (formData, navigateToTarget, regToast) =>
  //   dispatch(postCreateNote(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaneDetails);
