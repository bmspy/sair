import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {Icon} from '../../components';
import {colors, images} from '../../config';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import {useNavigation} from '@react-navigation/native';
import {VStack, HStack, Box, Actionsheet, useDisclose, useToast} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {postRegister} from '../../redux/actions/Index';
import {API_URL} from '@env';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

const MoreSignupDetails = props => {
  const navigation = useNavigation();
  const toast = useToast();
  // const {isOpen, onOpen, onClose} = useDisclose();
  const [deps, setDeps] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(false);

  //Name
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [thirdName, setThirdName] = useState('');
  const [fourthName, setFourthName] = useState('');

  //Phone No
  const [mobile, setMobile] = useState(null);

  //Job
  const [job, setJob] = useState(null);

  //Department
  const [department, setDepartment] = useState(null);

  //Image
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getDepartments = async () => {
      await fetch(`${API_URL}get/departments/`)
        .then(res => res.json())
        .then(parsedRes => {
          setDeps(parsedRes);
        });
      // const res = deps.json();
    };

    const getJobs = async () => {
      await fetch(`${API_URL}get/jobs/`)
        .then(res => res.json())
        .then(parsedRes => {
          // const names = parsedRes.map(item => item.name);
          setJobs(parsedRes);
        });
      // const res = deps.json();
    };

    getDepartments();
    getJobs();
  }, []);

  //IMAGE UPLOAD FUNCTIONS
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1280,
      compressImageMaxHeight: 720,
      //cropping: true,
      //multiple: true,
      compressImageQuality: 0.8,
    })
      .then(image => {
        // console.log(image.path);
        console.log(image);
        setImage(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 1280,
  //     compressImageMaxHeight: 720,
  //     //cropping: true,
  //     compressImageQuality: 0.8,
  //   })
  //     .then(image => {
  //       setImage(image.path);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const handleRegisterBtn = () => {
    console.log(image);
    const fullName = `${firstName} ${secondName} ${thirdName} ${fourthName}`;
    const gender = male ? 'Male' : 'Female';
    let imageFile = {};
    if (image?.path) {
      imageFile = {
        uri: image.path,
        type: image.mime,
        name: 'avatar.jpg',
      };
    }
    
    const signupData = props.signupData;

    const formData = new FormData();

    formData.append('email', signupData.email);
    formData.append('civil_number', signupData.civil_number);
    formData.append('job_number', signupData.job_number);
    formData.append('password', signupData.password);
    formData.append('confirm_password', signupData.confirm_password);
    formData.append('full_name', fullName);
    formData.append('mobile', mobile);
    formData.append('job', job);
    formData.append('department', department);
    formData.append('gender', gender);
    formData.append('image', imageFile);

    // const regData = {
    //   ...signupData,
    //   full_name: fullName,
    //   mobile: mobile,
    //   job: job,
    //   department: department,
    //   gender: gender,
    //   image: imageFile,
    // };
    // const navigateToTarget = navigation.navigate('HowWillGo');
    const regToast = toast;
    if (image?.path) {
      props.onPostRegister(formData, navigation.navigate, regToast);
    } else {
      alert('الرجاء إضافة صورة الملف الشخصي')
    }
  };

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => setDepartment(item.id)}
      style={[
        styles.sectionItemStyle,
        {
          backgroundColor:
            item.id === department ? colors.primary : 'transparent',
          borderRadius: 15,
        },
      ]}>
      <Image
        source={item.id === department ? images.section_active : images.section}
      />
      <Text
        style={{
          textAlign: 'center',
          color: item.id === department ? colors.white : colors.primary,
        }}>
        {item.name}
      </Text>
    </Pressable>
  );
  return (
    <ImageBackground
      source={images.signup}
      style={styles.container}
      imageStyle={styles.containerImge}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <SafeAreaView
        style={{
          marginTop: Platform.OS === 'android' ? 30 : 0,
          width: '100%',
          flex: 1,
          marginBottom: 15,
        }}>
        <Text style={styles.address}>أكمل المتطلبات</Text>

        <Pressable onPress={choosePhotoFromLibrary} style={styles.img}>
          <Image
            style={styles.img}
            source={image ? {uri: image.path} : images.add_photo}
          />
        </Pressable>

        {!image ? (
          <Text style={styles.hello1}> إضافة صورة الملف الشخصي </Text>
        ) : <Box marginY={5} />}

        <ScrollView nestedScrollEnabled>
          <HStack
            style={{
              justifyContent: 'space-between',
              width: '90%',
              alignSelf: 'center',
            }}>
            <VStack style={{width: wp('30%')}}>
              <Text style={styles.label}> الاسم الأول</Text>
              <TextInput
                placeholder={'احمد'}
                placeholderTextColor={colors.borderGrey}
                style={styles.input}
                onChangeText={setFirstName}
              />
            </VStack>
            <VStack style={{width: wp('30%')}}>
              <Text style={styles.label}> الاسم الثاني</Text>
              <TextInput
                placeholder={'احمد'}
                placeholderTextColor={colors.borderGrey}
                style={styles.input}
                onChangeText={setSecondName}
              />
            </VStack>
          </HStack>

          {/* <Text style={styles.label}> رقم الهاتف</Text>
        <TextInput
          placeholder={'(993)519-1203'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
        /> */}

          <HStack
            style={{
              justifyContent: 'space-between',
              marginTop: 15,
              width: '90%',
              alignSelf: 'center',
            }}>
            <VStack style={{width: wp('30%')}}>
              <Text style={styles.label}> الاسم الثالث</Text>
              <TextInput
                placeholder={'احمد'}
                placeholderTextColor={colors.borderGrey}
                style={styles.input}
                onChangeText={setThirdName}
              />
            </VStack>
            <VStack style={{width: wp('30%')}}>
              <Text style={styles.label}> الاسم الرابع</Text>
              <TextInput
                placeholder={'احمد'}
                placeholderTextColor={colors.borderGrey}
                style={styles.input}
                onChangeText={setFourthName}
              />
            </VStack>
          </HStack>

          <Text style={styles.label}> رقم الهاتف</Text>
          <TextInput
            placeholder={'(993)519-1203'}
            placeholderTextColor={colors.borderGrey}
            style={styles.input}
            onChangeText={setMobile}
          />

          {/* <Text style={styles.label}>الاسم رباعي</Text>
        <TextInput
          placeholder={'احمد محمد يوسف مدوج'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
        /> */}

          <Text style={styles.label}>الوظيفة</Text>
          <View style={styles.selectDropdownStyle}>
            <SelectDropdown
              data={jobs.map(item => item.name)}
              buttonStyle={styles.btnStyle}
              buttonTextStyle={styles.btnTxtStyle}
              defaultButtonText={'اختيار الوظيفة'}
              dropdownIconPosition="right"
              dropdownStyle={{}}
              renderDropdownIcon={() => (
                <Icon name="keyboard-arrow-down" type="material" />
              )}
              onSelect={(selectedItem, index) => {
                jobs.forEach(item => {
                  if (item.name === selectedItem) {
                    // console.log(item.id);
                    setJob(item.id);
                    // return item.id;
                  }
                });
                // console.log(job);
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

          <Text style={styles.label}>القسم</Text>
          <Box style={{alignItems: 'center', marginTop: 1}}>
            <FlatList
              nestedScrollEnabled={true}
              data={deps}
              numColumns={3}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
            {/* <FlatList
          data={[{}, {}, {}, {}, {}, {}]}
          numColumns={3}
          // keyExtractor={item => 'section' + item}
          RenderItem={(item, index) => {
            return (
              <View key={index} style={styles.sectionItemStyle}>
                <Image source={images.section} />
                <Text>تربية اسلامية</Text>
              </View>
            );
          }}
          // ListFooterComponent={() => {
          //   return (
          //     <View>
          //       <Pressable
          //         onPress={() => navigation.navigate('HowWillGo')}
          //         style={styles.btn}>
          //         <Text style={styles.loginBtn}>تسجيل</Text>
          //       </Pressable>

          //       <Pressable
          //         onPress={() => navigation.navigate('ForgetPassword')}>
          //         <Text style={styles.forgetText}>البنود و الشروط</Text>
          //       </Pressable>
          //       <Pressable
          //         style={styles.newAccount}
          //         onPress={() => navigation.navigate('SignIn')}>
          //         <Text style={styles.newAccountText}>
          //           تسجيل الدخول إلى حسابك
          //         </Text>
          //       </Pressable>
          //     </View>
          //   );
          // }}
        /> */}
          </Box>
          <VStack>
            <Text style={styles.label}>الجنس</Text>
            <HStack style={{justifyContent: 'center'}} space={10}>
              <ToggleSwitch
                isOn={male}
                onColor={colors.primary}
                offColor="#E6E6E6"
                // label="Example label"
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="large"
                onToggle={isOn => {
                  setMale(isOn);
                  setFemale(!isOn);
                }}
                icon={
                  <Icon name="male" type="ionicon" color={colors.primary} />
                }
              />
              <ToggleSwitch
                isOn={female}
                onColor="#D52BCA"
                offColor="#E6E6E6"
                // label="Example label"
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="large"
                onToggle={isOn => {
                  setFemale(isOn);
                  setMale(!isOn);
                }}
                icon={<Icon name="female" type="ionicon" color="#D52BCA" />}
              />
            </HStack>
          </VStack>
          <View>
            <Pressable onPress={handleRegisterBtn} style={styles.btn}>
              <Text style={styles.loginBtn}>تسجيل</Text>
            </Pressable>

            <Pressable onPress={() => console.log(props.signupData)}>
              <Text style={styles.forgetText}>البنود و الشروط</Text>
            </Pressable>
            <Pressable
              style={styles.newAccount}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.newAccountText}>تسجيل الدخول إلى حسابك</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack width="100%" space={5}>
          <Pressable
              onPress={handleRegisterBtn}
              style={[styles.btn, {marginTop: '5%'}]}>
                <HStack space={3}>
              <Text style={styles.loginBtn}>اختيار صورة</Text>
              <Icon name='image' type='feather' size={20} color={colors.white} />
                </HStack>
            </Pressable>
            <Pressable
              onPress={handleRegisterBtn}
              style={[styles.btn, {marginTop: null, marginBottom: '5%'}]}>
                <HStack space={3}>
              <Text style={styles.loginBtn}>التقاط صورة عبر الكاميرا</Text>
                <Icon name='camera' type='feather' size={20} color={colors.white} />
                </HStack>
            </Pressable>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet> */}
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  signupData: state.user.signupData,
});

const mapDispatchToProps = dispatch => ({
  onPostRegister: (regData, navigateToTarget, regToast) =>
    dispatch(postRegister(regData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreSignupDetails);
