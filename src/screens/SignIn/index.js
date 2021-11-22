import React, {Component, useEffect, useState} from 'react';
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
import stringifySafe from 'react-native/Libraries/Utilities/stringifySafe';
import LoadingModal from '../../components/LoadingModal/idnex';

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
  useEffect(() => {
    setPassword('123456789');
    setCivilNumber('405151688');
  }, []);
  const authenticateUser = async () => {
    if (validateLoginInput()) {
      setLoading(true);
      const user = new UserModel({
        civil_number: civilNumber,
        password: password,
      });

      try {
        await user.login();
        navigation.reset({
          index: 0,
          routes: [{name: 'MyDrawer', params: {type: 'supervisor'}}],
        });
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
      <LoadingModal
        message={'يرجى الإنتظار ريثما يتم تسجيل الدخول'}
        loading={loading}
      />
      <Text style={styles.address}>تسجيل الدخول</Text>
      <Text style={styles.hello}> ! اهلا بك مجدداً </Text>
      <Text style={styles.label}>الرقم المدني</Text>
      <TextInput
        placeholder={'أدخل الرقم المدني'}
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
