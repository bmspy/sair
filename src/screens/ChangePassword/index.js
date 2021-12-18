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
} from 'react-native';
import {colors, images} from '../../config';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from '../../components';
import {Tab, TabView, SearchBar, Header} from 'react-native-elements';
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
import {postChangePassword} from '../../redux/actions/Index';
import LoadingModal from '../../components/LoadingModal/index';

const ChangePassword = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = () => {
    if ((!oldPassword || !newPassword || !confirmNewPassword) || (oldPassword.length === 0 || newPassword.length === 0 || confirmNewPassword.length === 0)) {
      alert('الرجاء ادخال جميع البيانات ');
    } else {
      const formData = new FormData();
      formData.append('old_password', oldPassword);
      formData.append('new_password', newPassword);
      formData.append('confirm_new_password', confirmNewPassword);
      props.onPostChangePassword(formData, navigation.navigate, toast);
    }
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
      {/* <LoadingModal
        message={'يرجى الإنتظار ريثما يتم تغيير كلمة المرور'}
        loading={props.isLoading}
      /> */}
      <Header
        containerStyle={{width: '90%', alignSelf: 'center'}}
        backgroundColor="transparent"
        leftComponent={{
          icon: 'keyboard-arrow-right',
          color: '#000',
          type: 'material',
          size: 30,
          onPress: () => navigation.goBack(),
          //   iconStyle: {color: '#000'},
        }}
        // leftComponent={{
        //   icon: 'keyboard-arrow-right',
        //   color: '#000',
        //   type: 'material',
        //   size: 30,
        //   onPress: () => navigation.goBack(),
        //   //   iconStyle: {color: '#000'},
        // }}
        // centerComponent={{
        //   text: 'أنشىء كلمة مرور جديدة',
        //   style: [
        //     {color: '#000', fontSize: 20, fontWeight: 'bold', width: 300},
        //     styles.address,
        //   ],
        // }}
        // rightComponent={{icon: 'add', color: '#000', size: 25}}
      />
      {/* <Text style={styles.address}>تسجيل</Text> */}
      {/* <View style={styles.sideHeader}>
          <Pressable onPress={() => navigation.pop()}>
            <Icon
              type={'material'}
              size={30}
              name={'keyboard-arrow-right'}
              color={colors.black}
            />
          </Pressable>
          <Text style={styles.address}> أنشئ كلمة مرور جديدة </Text>
        </View> */}
      <VStack style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.label, {fontSize: 18}]}>أنشئ كلمة مرور جديدة</Text>
        <Text style={styles.hello}>
          يجب أن تكون كلمة مرورك الجديدة مختلفة عن كلمات المرور السابقة
          المستخدمة
        </Text>

        <Text style={styles.label}>كلمة المرور القديمة</Text>
        <TextInput
          placeholder={'******'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
          secureTextEntry
          onChangeText={setOldPassword}
        />

        <Text style={styles.label}>كلمة المرور الجديدة</Text>
        <TextInput
          placeholder={'******'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
          secureTextEntry
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>تاكيد كلمة المرور الجديدة</Text>
        <TextInput
          placeholder={'******'}
          placeholderTextColor={colors.borderGrey}
          style={styles.input}
          secureTextEntry
          onChangeText={setConfirmNewPassword}
        />
      </VStack>

      <Pressable onPress={handleChangePassword} style={styles.btn}>
        <Text style={styles.loginBtn}>حفظ</Text>
      </Pressable>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
});

const mapDispatchToProps = dispatch => ({
  onPostChangePassword: (formData, navigateToTarget, toast) => dispatch(postChangePassword(formData, navigateToTarget, toast)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
