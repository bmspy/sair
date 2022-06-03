import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, Pressable, StatusBar, BackHandler, Alert} from 'react-native';
import {colors, images} from '../../config';
import styles from './styles';
import {Icon} from '../../components';
import ConfirmModal from './ConfirmModal';
import {useNavigation} from '@react-navigation/native';
import {VStack, HStack, Box, Modal} from 'native-base';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const HowWillGo = props => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [havePlan, setHavePlan] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const handleBack = () => {
        Alert.alert('الخروج من التطبيق', 'هل تريد بالتأكيد الخروج من التطبيق؟', [
          {
            text: 'إلغاء',
            style: 'cancel',
          },
          {
            text: 'تأكيد الخروج',
            onPress: () => BackHandler.exitApp(),
          },
        ]);

        return true;
      };

      const unsubscribe = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBack,
      );

      return () => unsubscribe.remove();
    }, []),
  );

  const handleChoose = () => {
    // console.log(havePlan);
    switch (index) {
      case 0:
        // setVisible(true); // show if no plans
        if (props.profile?.have_plan) {
          navigation.navigate('Home');
        } else {
          setShowModal(true);
        }
        break;
      case 1:
        if (props.profile?.have_plan) {
          // setShowModal(true);
          navigation.navigate('MonthlyVisitsPlane');
        } else {
          setShowModal(true);
        }
        break;
      case 2:
        navigation.navigate('AddPlane');
        break;
      default:
        break;
    }
  };

  // useEffect(() => {
  //   console.log(props.profile?.have_plan);
  //   // const gethavePlan = async () => {
  //   //   const havePlan = await AsyncStorage.getItem('have_plan', (err, value) => {
  //   //     if (err) {
  //   //       console.log(err);
  //   //     } else {
  //   //       JSON.parse(value); // boolean false
  //   //     }
  //   //   });
  //   //   setHavePlan(havePlan);
  //   // };
    
  //   // gethavePlan();
  // }, []);

  return (
    <View style={[styles.container, {alignItems: 'center', justifyContent: 'center'}]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Box safeArea />
      {/* <Pressable onPress={() => navigation.navigate('Home')}>
        <Text style={styles.hello1}> تجاهل</Text>
      </Pressable> */}
      <Image style={styles.img} source={images.back_home} />
      <Text style={styles.hello}> مرحبا بك في ساير</Text>
      <Text style={styles.address}> قم باختيار خطوتك التالية</Text>

      <Pressable
        onPress={() => setIndex(0)}
        style={index == 0 ? styles.itemViewActive : styles.itemView}>
        <Icon
          name={'tasks'}
          type={'font-awesome'}
          size={18}
          color={'#101CB1'}
        />
        <Text style={[styles.address]}> استعراض الخطة </Text>
        {index == 0 && (
          <Icon name={'check'} type={'AntDesign'} color={colors.primary} />
        )}
      </Pressable>

      {/* <Pressable
        onPress={() => setIndex(1)}
        style={index == 1 ? styles.itemViewActive : styles.itemView}>
        <Icon
          name={'file-pdf'}
          type={'material-community'}
          size={18}
          color={'#A110B1'}
        />
        <Text style={styles.address}> تصدير الخطة </Text>
        {index == 1 && (
          <Icon name={'check'} type={'AntDesign'} color={colors.primary} />
        )}
      </Pressable> */}

      <Pressable
        onPress={() => setIndex(1)}
        style={index == 1 ? styles.itemViewActive : styles.itemView}>
        <Icon
          name={'calendar-month'}
          type={'material-community'}
          size={18}
          color={'#A110B1'}
        />
        <Text style={styles.address}> خطة الزيارات الشهرية </Text>
        {index == 1 && (
          <Icon name={'check'} type={'AntDesign'} color={colors.primary} />
        )}
      </Pressable>

      <Pressable
        onPress={() => setIndex(2)}
        style={index == 2 ? styles.itemViewActive : styles.itemView}>
        <Icon
          name={'hand-o-up'}
          type={'font-awesome'}
          size={18}
          color={'#D8702B'}
        />
        <Text style={styles.address}> ادخال الخطة </Text>
        {index == 2 && (
          <Icon name={'check'} type={'AntDesign'} color={colors.primary} />
        )}
      </Pressable>

      <Pressable onPress={handleChoose} style={styles.btn}>
        <Text style={styles.loginBtn}> اختيار</Text>
      </Pressable>

      {/* <Pressable onPress={() => console.log(havePlan)} style={[styles.btn, {marginTop: 10}]}>
        <Text style={styles.loginBtn}>test</Text>
      </Pressable> */}

      {/* <ConfirmModal
        visible={false}
        onRequestClose={() => setVisible(false)}
      /> */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px" paddingY={7}>
          <VStack space={5}>
            <Text style={styles.address1}>
              {' '}
              يرجى اكمال خطتك لتتمكن من استعراضها{' '}
            </Text>
            <HStack justifyContent="center" space={5}>
              <Pressable
                onPress={() => {
                  navigation.navigate('AddPlane');
                  setShowModal(false);
                }}
                style={styles.driver_btn}>
                <Text style={styles.driver_txt}>إضافة خطة</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowModal(false);
                }}
                style={styles.special_car}>
                <Text style={styles.special_car_txt}>تجاهل</Text>
              </Pressable>
            </HStack>
          </VStack>
        </Modal.Content>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(HowWillGo);
