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

const About = props => {
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
          text: 'عن التطبيق',
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
            فرضت علينا التكنولوجيا نفسها وبقوّة في كافة جوانب حياتنا اليومية،
            كما أن أحد مرتكزات رؤية عمان 2040 هي التحول الرقمي وتوظيف
            التكنولوجيا
          </Text>
          <Text style={styles.date}>
            و قد جاءت مبادرة (ساير) منذ فترة طويلة لتوظف التقنية التوظيف الأمثل في
            انجاز الأعمال. حيث بدأت الفكرة كبرنامج على الحاسوب ثم تم تطويره
            ليصبح تطبيق على الهواتف الذكية كما هو الآن بين أيديكم
          </Text>
          <Text style={styles.date}>
            (تطبيق ساير) هو التطبيق الذي أطلقته المديرية العامة للتربية والتعليم
            في محافظة البريمي ممثلة في دائرة الاشراف التربوي بهدف تنظيم وتحسين
            عمل الزيارات الميدانية والخطط الشهرية للمشرفين وباقي الموظفين
          </Text>
          <Text style={styles.date}>
            يساعدك (تطبيق ساير) في وضع خطتك الشهرية بكل سهولة ويسر، كما يساعدك
            في تنظيم واختيار وسيلة النقل المناسبة لتنفيذ الخطة. وبذلك يمنع تعارض
            الخطط ويساهم في استغلال الموارد بالطريقة المثلى
          </Text>
          <Text style={styles.date}>
            يستخدم (تطبيق ساير) تكنولوجيا متطورة حيث يراعي الموثوقيه والخصوصية
            على حد سواء
          </Text>
          <Text style={styles.date}>
            من خلال استخدام (تطبيق ساير) فإنك تستطيع تأدية عملك ومتابعة خطط
            زياراتك بكل بساطة وفي أي مكان كنت. دون الحاجة لتواجدك في مقر العمل
          </Text>
        </VStack>
        <HStack
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 25,
            marginVertical: 15
          }}>
          <DashedLine
            style={{width: wp('30%')}}
            axis="horizontal"
            dashLength={10}
            dashThickness={1.5}
            dashGap={7}
            dashColor={colors.primary}
          />
          <Text style={[styles.address, {color: colors.primary}]}>للتواصل</Text>
          <DashedLine
            style={{width: wp('30%')}}
            axis="horizontal"
            dashLength={10}
            dashThickness={1.5}
            dashGap={7}
            dashColor={colors.primary}
          />
        </HStack>
        <HStack style={{justifyContent: 'center', alignItems: 'center', marginBottom: 15}} space={3}>
          <Image style={{alignSelf: 'center'}} source={images.ibrahim} />
          <VStack space={2}>
            <HStack space={2}>
              <Icon name="phone" size={20} />
              <Text style={[styles.date, {paddingHorizontal: null}]}>+96899595613</Text>
            </HStack>
            <HStack space={2}>
            <Icon name="email" size={20} />
              <Text style={[styles.date, {paddingHorizontal: null}]}>ibrahem.alsaidi@moe.om</Text>
            </HStack>
          </VStack>
        </HStack>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
