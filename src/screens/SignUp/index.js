import React, {useState} from 'react';
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
import {HStack, Box} from 'native-base';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {setSignupData} from '../../redux/actions/Index';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

const SignUp = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(null);
  const [civilNumber, setCivilNumber] = useState(null);
  const [jobNumber, setJobNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleNextBtn = () => {
    const signupData = {
      email: email,
      civil_number: civilNumber,
      job_number: jobNumber,
      password: password,
      confirm_password: confirmPassword,
    };
    props.onSetSignupData(signupData);
    navigation.navigate('MoreSignupDetails');
  };

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
      <Box safeArea />
      {/* <SafeAreaView style={{marginTop: Platform.OS === 'android' ? 30 : 0}}> */}
      <ScrollView style={styles.content}>
        <HStack
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'center',
            width: wp('92%'),
          }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              name="keyboard-arrow-right"
              color="#000"
              type="material"
              size={30}
            />
          </Pressable>
          <Text style={[styles.address, {marginTop: 0}]}>تسجيل</Text>
          <View />
        </HStack>
        <Text style={styles.hello}> !انشئ حساب </Text>

        <Text style={styles.label}>البريد الالكتروني</Text>
        <TextInput
          placeholder={'patrick.cunningham@mail.com'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>الرقم المدني</Text>
        <TextInput
          placeholder={'378862'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
          onChangeText={setCivilNumber}
        />

        <Text style={styles.label}>الرقم الوظيفي</Text>
        <TextInput
          placeholder={'378862'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
          onChangeText={setJobNumber}
        />

        <Text style={styles.label}>كلمة المرور</Text>
        <TextInput
          placeholder={'******'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Text style={styles.label}>تاكيد كلمة المرور</Text>
        <TextInput
          placeholder={'******'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />

        <Pressable onPress={handleNextBtn} style={styles.btn}>
          <Text style={styles.loginBtn}>التالي</Text>
        </Pressable>

        <Pressable onPress={() => console.log(props.profile)}>
          <Text style={styles.forgetText}>البنود و الشروط</Text>
        </Pressable>
        <Pressable
          style={styles.newAccount}
          onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.newAccountText}>تسجيل الدخول إلى حسابك</Text>
        </Pressable>
      </ScrollView>
      {/* </SafeAreaView> */}
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  signupData: state.user.signupData,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onSetSignupData: signupData => dispatch(setSignupData(signupData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
