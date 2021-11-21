import React, {Component, useState} from 'react';
import {View, Text, ImageBackground, TextInput, Pressable} from 'react-native';
import {colors, images} from '../../config';
import styles from './styles';
import UserModel from '../../app/models/UserModel';

export default function SignIn() {
  const [civilNumber, setCivilNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  const validateInput = () => {
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
    if (validateInput()) {
      setLoading(true);
      const user = new UserModel(civilNumber, password);

      try {
        await user.login();
      } catch (err) {
        setError(err.message);
        setVisible(true);
        setLoading(false);
      }
    } else {
      setError('Please fill out all *required fields');
      setVisible(true);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={images.signin}
      style={styles.container}
      imageStyle={styles.containerImge}>
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

      <Pressable
        onPress={() =>
          this.props.navigation.navigate('MyDrawer', {type: 'supervisor'})
        }
        style={styles.btn}>
        <Text style={styles.loginBtn}>تسجيل الدخول</Text>
      </Pressable>

      <Pressable
        onPress={() => this.props.navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgetText}>نسيت كلمة المرور ؟</Text>
      </Pressable>
      <Pressable
        style={styles.newAccount}
        onPress={() => this.props.navigation.navigate('SignUp')}>
        <Text style={styles.newAccountText}>انشاء حساب جديد</Text>
      </Pressable>
    </ImageBackground>
  );
}
