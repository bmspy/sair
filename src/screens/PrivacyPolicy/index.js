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
import {Tab, TabView, SearchBar, Header} from 'react-native-elements';
import {
  VStack,
  HStack,
  Modal,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
  Button,
  Spinner,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setNote} from '../../redux/actions/Index';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '@env';
import DashedLine from 'react-native-dashed-line';

const PrivacyPolicy = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#FFF'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        containerStyle={{width: '90%', alignSelf: 'center'}}
        backgroundColor="#FFF"
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
        centerComponent={{
          text: 'سياسة الخصوصية',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        // rightComponent={{
        //   icon: 'add',
        //   color: '#000',
        //   size: 25,
        //   onPress: () => navigation.navigate('AddNote'),
        // }}
      />
      <ScrollView>
        <Image style={{alignSelf: 'center'}} source={images.logo} />
        <VStack space={2}>
          <Text style={styles.date}>
          إنّ سياسة الخصوصية هذه تعرفك عن سياستنا فيما يتعلق بجمع و استخدام المعلومات الشخصية أثناء استخدامك للتطبيق بالإضافة للخيارات المتاحة لديك والمتعلقة بهذه المعلومات بموجب سياسة الخصوصية هذه حيث أن أولى اهتماماتنا هو حفاظ وضمان خصوصية استخدامك للموقع وخصوصية المعلومات المقدمة من قبلك على الموقع.

نحن نقوم باستخدام معلوماتك الشخصية لتقديم الخدمات المتاحة في التطبيق وتحسينها و/أو تحسين استخدامك للتطبيق، وبمجرد استخدامك التطبيق، أنت توافق على جمعنا للمعلومات و استخدامها وفقًا لهذه السياسة.
   
          </Text>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  notes: state.note.notes,
});

const mapDispatchToProps = dispatch => ({
  //   onSetNote: note => dispatch(setNote(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
