import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  Modal,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import {VStack, HStack, Box, useToast} from 'native-base';
import {Icon} from '../../components';
import {colors, images} from '../../config';
import styles from './styles';
import UserModel from '../../app/models/UserModel';
import {useNavigation} from '@react-navigation/native';
import LoadingModal from '../../components/LoadingModal/index';
import {connect} from 'react-redux';
import {postForgetPassword} from '../../redux/actions/Index';

const ForgetPassword = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [email, setEmail] = useState('');

  const handleForgetPassword = () => {
    if (!email || email.length === 0) {
      alert('الرجاء ادخال البريد الإلكتروني');
    } else {
      const formData = new FormData();
      formData.append('email', email);
      props.onPostForgetPassword(formData, navigation.navigate, toast);
    }
  };

  return (
    <ImageBackground
      source={images.signin}
      style={styles.container}
      imageStyle={styles.containerImge}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Icon
            name="keyboard-arrow-right"
            color="#FFF"
            type="material"
            size={30}
          />
        </Pressable>
        <Text style={styles.address}> نسيت كلمة المرور</Text>
        <View />
      </View>
      <Image style={styles.img} source={images.forgot_password} />
      <Text style={styles.hello}>
        {' '}
        قم بكتابة بريدك الالكتروني لتتمكن من استرجاع كلمة المرور
      </Text>
      <Text style={styles.label}>البريد الالكتروني </Text>
      <TextInput
        placeholder={'patrick.cunningham@mail.com'}
        placeholderTextColor={colors.white}
        style={styles.input}
        onChangeText={setEmail}
      />

      <Pressable onPress={handleForgetPassword} style={styles.btn}>
        <Text style={styles.loginBtn}> ارسال</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.forgetText}>انشاء حساب جديد</Text>
      </Pressable>

      <Pressable
        style={styles.newAccount}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.newAccountText}>يوجد مشكلة ؟ مساعدة</Text>
      </Pressable>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  onPostForgetPassword: (email, navigateToTarget, toast) =>
    dispatch(postForgetPassword(email, navigateToTarget, toast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
