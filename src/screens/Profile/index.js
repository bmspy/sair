import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {putEditProfile} from '../../redux/actions/Index';

const Profile = props => {
  const navigation = useNavigation();
  const toast = useToast();

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
          text: 'الملف الشخصي',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        // rightComponent={{icon: 'home', color: '#000'}}
      />
      <View style={[styles.header, {marginTop:'5%'}]}>
        <View />
        <Avatar
          bg="cyan.500"
          // alignSelf="center"
          size="2xl"
          source={{uri: props.profile.image}}
          style={{padding: 10}}
          //   borderStyle=''
          borderWidth={2}
          borderColor="#10B1B1"
        />
        {/* <ImageBackground
          style={styles.imgContainer}
          imageStyle={styles.img}
          source={images.avatar}>
          <Icon name={'camera'} type={'feather'} />
        </ImageBackground> */}
        <Pressable style={{right: 10}} onPress={() => navigation.navigate('EditProfile')}>
          <Icon name={'edit'} type={'feather'} />
        </Pressable>
      </View>
      <VStack
        style={{
          backgroundColor: '#F0F0F0',
          width: '85%',
          alignSelf: 'center',
          borderRadius: 15,
          padding: 10,
          marginTop: 20,
        }}>
        <VStack>
          <Text style={styles.address4}>البريد الالكتروني</Text>
          <Text style={styles.address3}>{props.profile.email}</Text>
        </VStack>
        <VStack>
          <Text style={styles.address4}>الرقم المدني</Text>
          <Text style={styles.address3}>{props.profile.civil_number}</Text>
        </VStack>
        <VStack>
          <Text style={styles.address4}>الرقم الوظيفي</Text>
          <Text style={styles.address3}>{props.profile.job_number}</Text>
        </VStack>
        <VStack>
          <Text style={styles.address4}>رقم الهاتف</Text>
          <Text style={styles.address3}>{props.profile.mobile}</Text>
        </VStack>
        <VStack>
          <Text style={styles.address4}>الاسم رباعي</Text>
          <Text style={styles.address3}>{props.profile.full_name}</Text>
        </VStack>
        <Pressable
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}
          style={[styles.btn, {width: '70%', marginVertical:'10%'}]}>
          <HStack style={{justifyContent: 'center', alignItems: 'center'}} space={2}>
            <Icon name={'lock'} type={'material'} size={20} color="#FFF" />
            <Text style={styles.loginBtn}> تغيير كلمة المرور </Text>
          </HStack>
        </Pressable>
        {/* <Pressable onPress={() => console.log(props.profile)} style={[styles.btn, {width: '70%', marginVertical:'10%'}]}>
        </Pressable> */}
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
  // onPutEditProfile: (formData, navigateToTarget, regToast) => dispatch(putEditProfile(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
