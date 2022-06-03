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
  // Share,
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
import {ar} from 'date-fns/locale';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {connect} from 'react-redux';
import {} from '../../redux/actions/Index';
import {API_URL} from '@env';
import Share from 'react-native-share';
import {planHTML} from '../../services/PlanHTML';

const ExportPlan = props => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [planDetailsData, setPlanDetailsData] = useState({});
  const [planComplete, setplanComplete] = useState(false);

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
    setIsLoading(true);
    const getPlanDetails = async () => {
      const token = await AsyncStorage.getItem('id_token');
      try {
        const response = await axios.get(`${API_URL}get/plan/details/`, {
          params: {
            month: props.planDetailsDate.planDetailsMonth,
            year: props.planDetailsDate.planDetailsYear,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setIsLoading(false);
        setPlanDetailsData(response.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getPlanDetails();
  }, []);

  // const createPDF = async () => {
  //   let options = {
  //     html: '<table><tr><th>Firstname</th><th>Lastname</th></tr></table>',
  //     fileName:
  //       'plan_' +
  //       props.planDetailsDate?.planDetailsMonth +
  //       '_' +
  //       props.planDetailsDate?.planDetailsYear,
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

  const handleShare = () => {
    let options = {
      html: planHTML(
        planDetailsData,
        props.profile.full_name,
        props.planDetailsDate,
      ),
      fileName:
        'plan_' +
        props.planDetailsDate?.planDetailsMonth +
        '_' +
        props.planDetailsDate?.planDetailsYear,
      directory: 'Documents',
    };

    RNHTMLtoPDF.convert(options).then(result => {
      Share.open({
        title: 'Sayer',
        message: 'Sayer',
        url: 'file:///' + result.filePath,
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
          // err && alert(err);
        });
    });

    // Share.open({
    //   title: 'Sayer',
    //   message: 'Sayer',
    //   url:
    //     'file:///storage/emulated/0/Android/data/com.sayer/files/Documents/' +
    //     'plans_' +
    //     props.planDetailsDate?.planDetailsMonth +
    //     '_' +
    //     props.planDetailsDate?.planDetailsYear +
    //     '.pdf',
    // })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     err && console.log(err);
    //     // err && alert(err);
    //   });
  };

  // const onShare = async () => {
  //   try {
  //     const result = await Share.share(
  //       {
  //         // message:
  //         //   'تطبيق ساير',
  //         title: 'تفاصيل الخطة',
  //         message: 'تطبيق ساير',
  //         url:
  //           'file:///storage/emulated/0/Android/data/com.sayer/files/Documents/' +
  //           'plan_' +
  //           props.planDetailsDate?.planDetailsMonth +
  //           '_' +
  //           props.planDetailsDate?.planDetailsYear +
  //           '.pdf',
  //         subject: 'خطة',
  //       },
  //       {
  //         excludedActivityTypes: [
  //           // 'com.apple.UIKit.activity.PostToWeibo',
  //           'com.apple.UIKit.activity.Print',
  //           'com.apple.UIKit.activity.CopyToPasteboard',
  //           // 'com.apple.UIKit.activity.AssignToContact',
  //           'com.apple.UIKit.activity.SaveToCameraRoll',
  //           // 'com.apple.UIKit.activity.AddToReadingList',
  //           // 'com.apple.UIKit.activity.PostToFlickr',
  //           // 'com.apple.UIKit.activity.PostToVimeo',
  //           // 'com.apple.UIKit.activity.PostToTencentWeibo',
  //           'com.apple.UIKit.activity.AirDrop',
  //           'com.apple.UIKit.activity.OpenInIBooks',
  //           'com.apple.UIKit.activity.MarkupAsPDF',
  //           // 'com.apple.reminders.RemindersEditorExtension',
  //           // 'com.apple.mobilenotes.SharingExtension',
  //           // 'com.apple.mobileslideshow.StreamShareService',
  //           // 'com.linkedin.LinkedIn.ShareExtension',
  //           // 'pinterest.ShareExtension',
  //           // 'com.google.GooglePlus.ShareExtension',
  //           // 'com.tumblr.tumblr.Share-With-Tumblr',
  //           // 'net.whatsapp.WhatsApp.ShareExtension', //WhatsApp
  //         ],
  //       },
  //     );
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
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
              <Pressable onPress={() => navigation.goBack()}>
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
                  {format(
                    new Date(
                      `${props.planDetailsDate?.planDetailsYear}-${props.planDetailsDate?.planDetailsMonth}`,
                    ),
                    'MMM',
                    {locale: ar},
                  )}
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
                    الوجهة
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
              <ScrollView
                style={{height: hp('30%')}}
                showsVerticalScrollIndicator={false}>
                {!isLoading && planDetailsData?.plans ? (
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
                          numberOfLines={1}
                          style={[
                            styles.loginBtn,
                            {
                              color: colors.dimGray,
                              marginHorizontal: 5,
                              fontSize: 14,
                              textAlign: 'left',
                              maxWidth: wp('40%'),
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
                  ))
                ) : !isLoading && !planDetailsData?.plans ? (
                  <Box style={{marginVertical: hp('15%')}}>
                    <Text
                      style={[
                        styles.loginBtn,
                        {
                          color: colors.dimGray,
                          marginHorizontal: 5,
                          fontSize: 14,
                          textAlign: 'center',
                        },
                      ]}>
                      لا يمكن عرض هذه الخطة لأنها غير مكتملة
                    </Text>
                  </Box>
                ) : (
                  <Spinner style={{marginVertical: hp('15%')}} size="lg" />
                )}
              </ScrollView>
              {/* {
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
              )) : (<Spinner style={{marginVertical: 50}} size='lg' />)} */}
              {/* Table Body Finish */}
            </VStack>
            {/* Table Finish */}

            {!planDetailsData?.plans ? null : (
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
                  {planDetailsData?.finished &&
                  !planDetailsData?.approved_request &&
                  !planDetailsData?.approved ? (
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
                      هذه الخطة الشهرية للمشرف معتمدة من مدير الدائرة.
                    </Text>
                  ) : planDetailsData?.finished &&
                    planDetailsData?.approved_request &&
                    !planDetailsData?.approved ? (
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
                  ) : (
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
                      هذه الخطة الشهرية للمشرف معتمدة من مدير الدائرة.
                    </Text>
                  )}
                </HStack>

                {/* <Pressable
                onPress={createPDF}
                style={[styles.btn, {width: '70%', marginVertical: '5%'}]}>
                <HStack
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.loginBtn}> Print PDF </Text>
                </HStack>
              </Pressable> */}
              </VStack>
            )}
          </ScrollView>
          {/* Body Finish */}
        </VStack>
      </Card>
      {!planDetailsData?.approved ? null : (
        <HStack
          width="90%"
          style={{alignSelf: 'center', marginTop: 10}}
          space={5}>
          {/* <Pressable onPress={() => Alert.alert('تصدير خطة', 'سيتم إضافة هذه الخاصية قريبا')}> */}
          <Pressable onPress={handleShare}>
            <HStack style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name={'file-pdf'}
                type={'material-community'}
                color={colors.primary}
                size={wp('7%')}
              />
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
                PDF تصدير
              </Text>
            </HStack>
          </Pressable>
          {/* <Pressable onPress={() => Alert.alert('مشاركة الخطة', 'سيتم إضافة هذه الخاصية قريبا')}> */}
          {/* <Pressable onPress={handleShare}>
          <HStack style={{alignItems: 'center', justifyContent: 'center'}}>
            <Icon
              name={'share'}
              type={'material'}
              color={colors.primary}
              size={wp('7%')}
            />
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
              مشاركة
            </Text>
          </HStack>
        </Pressable> */}
        </HStack>
      )}

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

export default connect(mapStateToProps, mapDispatchToProps)(ExportPlan);
