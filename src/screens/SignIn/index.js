import React, {Component, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {colors, images} from '../../config';
import styles from './styles';
import UserModel from '../../app/models/UserModel';
import {useNavigation} from '@react-navigation/native';

export default function SignIn() {
  const [civilNumber, setCivilNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation();

  const validateLoginInput = () => {
    let errors = false;

    if (!civilNumber || civilNumber.length === 0) {
      errors = true;
    }

    if (!password || password.length === 0) {
      errors = true;
    }

    return !errors;
  };

  const authenticateUser = async () => {
    if (validateLoginInput()) {
      setLoading(true);
      const user = new UserModel(civilNumber, password);

      try {
        await user.login();
      } catch (err) {
        alert(err.message);
        setVisible(true);
        setLoading(false);
      }
    } else {
      alert('يرجى ملء جميع الحقول المطلوبة');
      setVisible(true);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={images.signin}
      style={styles.container}
      imageStyle={styles.containerImge}>
      <Modal
        visible={true}
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: 'absolute',
          backgroundColor: 'orange',
        }}
        transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '80%',
              height: '30%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color:'black'}}>
              يرجى الإنتظار ريثما يتم تسجيل الدخول
            </Text>
            <ActivityIndicator
                style={{marginTop:15, marginBottom:15}}
                animating={true} size={'large'}
            color={colors.primary}
            />
            {/*<Pressable*/}
            {/*  style={{*/}
            {/*    width: '80%',*/}
            {/*    height: 45,*/}
            {/*    backgroundColor: colors.primary,*/}
            {/*    borderRadius: 20,*/}
            {/*  }}>*/}
            {/*  {}*/}
            {/*</Pressable>*/}
          </View>
        </View>
      </Modal>
      <Text style={styles.address}>تسجيل الدخول</Text>
      <Text style={styles.hello}> ! اهلا بك مجدداً </Text>
      <Text style={styles.label}>الرقم المدني</Text>
      <TextInput
        placeholder={'378862'}
        placeholderTextColor={colors.white}
        style={styles.input}
        value={civilNumber}
        onChangeText={newValue => {
          setCivilNumber(newValue);
        }}
      />
      <Text style={styles.label}>كلمة المرور</Text>
      <TextInput
        placeholder={'أدخل كلمة المرور'}
        placeholderTextColor={colors.white}
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={newValue => setPassword(newValue)}
      />

      <Pressable onPress={() => authenticateUser()} style={styles.btn}>
        <Text style={styles.loginBtn}>تسجيل الدخول</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgetText}>نسيت كلمة المرور ؟</Text>
      </Pressable>
      <Pressable
        style={styles.newAccount}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.newAccountText}>انشاء حساب جديد</Text>
      </Pressable>
    </ImageBackground>
  );
}
