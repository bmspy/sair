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
import {Tab, TabView, FAB, Header} from 'react-native-elements';
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
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {putEditProfile} from '../../redux/actions/Index';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const EditProfile = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');
  const [image, setImage] = useState(null);

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

  const handleEditProfile = () => {
    let imageFile = {};
    if (image?.path) {
      imageFile = {
        uri: image.path,
        type: image.mime,
        name: 'avatar.jpg',
      };
    }
    const formData = new FormData();

    formData.append('email', email);
    if (props.profile?.user_type === 'driver') {
      formData.append('mobile_for_call', mobile);
    } else {
      formData.append('mobile', mobile);
    }
    formData.append('full_name', fullName);
    formData.append('image', imageFile);
    const regToast = toast;
    if (image?.path) {
      if (email !== '' && fullName !== '') {
        props.onPutEditProfile(formData, navigation.navigate, regToast);
      } else {
        alert('الرجاء ادخال جميع البيانات');
      }
    } else {
      alert('الرجاء إضافة صورة الملف الشخصي');
    }
  };

  useEffect(() => {
    console.log(props.profile.image);
  }, [])

  return (
    <SafeAreaView
      style={{backgroundColor: '#FFF', width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        containerStyle={{width: '90%', alignSelf: 'center'}}
        backgroundColor="#FFF"
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
          text: 'تعديل الملف الشخصي',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        // rightComponent={{icon: 'home', color: '#000'}}
      />
      <View
        style={[styles.header, {marginTop: '5%', justifyContent: 'center'}]}>
        {/* <View /> */}
        <Pressable onPress={choosePhotoFromLibrary}>
          <VStack
            style={{
              position: 'absolute',
              zIndex: 10,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              top: '40%',
            }}>
            <Icon name={'camera'} type={'ionicon'} color="#D4D1D4" />
          </VStack>
          <Image
            style={{width: wp('30%'), height: wp('30%'), borderRadius: wp('30%')}}
            source={
              image?.path ? {uri: image.path} : {uri: props.profile.image}
            }
          />
          {/* <Avatar
            bg="#000"
            // alignSelf="center"
            size="2xl"
            source={
              image?.path
                ? {uri: image.path}
                : {uri: props.profile.image}
            }
            // source={image ? {uri: image} : images.new_avatar}
            // source={image?.path ? {uri: image.path} : {uri: props.profile.image}}
            style={{padding: 10, opacity: 0.75}}
            //   borderStyle=''
            borderWidth={2}
            borderColor="#10B1B1"
          /> */}
        </Pressable>
        {/* <ImageBackground
          style={styles.imgContainer}
          imageStyle={styles.img}
          source={images.avatar}>
          <Icon name={'camera'} type={'feather'} />
        </ImageBackground> */}
        {/* <Pressable style={{right: 10}} onPress={() => alert('Test')}>
          <Icon name={'edit'} type={'feather'} />
        </Pressable> */}
      </View>
      <VStack
        space={5}
        style={{
          //   backgroundColor: '#F0F0F0',
          width: '85%',
          alignSelf: 'center',
          borderRadius: 15,
          padding: 10,
          marginTop: 20,
        }}>
        <VStack>
          <Text style={styles.address4}>البريد الالكتروني</Text>
          <TextInput
            placeholder={'test@test.com'}
            placeholderTextColor={colors.borderGrey}
            style={styles.input}
            onChangeText={setEmail}
          />
        </VStack>
        {/* <VStack>
          <Text style={styles.address4}>الرقم المدني</Text>
          <TextInput
            placeholder={'23456'}
            placeholderTextColor={colors.borderGrey}
            style={styles.input}
          />
        </VStack> */}
        {/* <VStack>
          <Text style={styles.address4}>الرقم الوظيفي</Text>
          <TextInput
            placeholder={'34567'}
            placeholderTextColor={colors.borderGrey}
            style={styles.input}
          />
        </VStack> */}
        <VStack>
          <Text style={styles.address4}>رقم الهاتف</Text>
          <TextInput
            placeholder={'8762345678'}
            placeholderTextColor={colors.borderGrey}
            style={styles.input}
            onChangeText={setMobile}
          />
        </VStack>
        <VStack>
          <Text style={styles.address4}>الاسم رباعي</Text>
          <TextInput
            placeholder={'Mustafa Abdullah'}
            placeholderTextColor={colors.borderGrey}
            style={styles.input}
            onChangeText={setFullName}
          />
        </VStack>
        <Pressable
          onPress={handleEditProfile}
          style={[styles.btn, {width: '70%', marginVertical: '10%'}]}>
          <HStack
            style={{justifyContent: 'center', alignItems: 'center'}}
            space={2}>
            {/* <Icon name={'lock'} type={'material'} size={20} color="#FFF" /> */}
            <Text style={styles.loginBtn}> حفظ </Text>
          </HStack>
        </Pressable>
      </VStack>
      {/* <View style={styles.container}>
        <Text style={styles.address4}>البريد الالكتروني</Text>
        <Text style={styles.address3}>patrick.cunningham@mail.com</Text>

        <Text style={styles.address4}>الرقم المدني</Text>
        <Text style={styles.address3}>p378862</Text>

        <Text style={styles.address4}>الرقم الوظيفي</Text>
        <Text style={styles.address3}>8736735</Text>

        <Text style={styles.address4}>رقم الهاتف</Text>
        <Text style={styles.address3}>(993)519-1203</Text>

        <Text style={styles.address4}>الاسم رباعي</Text>
        <Text style={styles.address3}>احمد محمد يوسف مدوج</Text>
      </View> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onPutEditProfile: (formData, navigateToTarget, regToast) => dispatch(putEditProfile(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
