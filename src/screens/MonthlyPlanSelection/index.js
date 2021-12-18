import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {Icon} from '../../components';
import {colors, images} from '../../config';
import styles from './styles';
import {Tab, TabView, Card, Header} from 'react-native-elements';
import {
  VStack,
  HStack,
  Modal,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {borderRadius} from 'styled-system';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MonthlyPlanSelection = props => {
  const navigation = useNavigation();
  const {isOpen, onOpen, onClose} = useDisclose();

  return (
    <SafeAreaView
      style={{backgroundColor: '#FFF', width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        //   containerStyle={{justifyContent: 'flex-end'}}
        backgroundColor="#FFF"
        leftComponent={{
          icon: 'keyboard-arrow-right',
          color: '#000',
          type: 'material',
          size: 30,
          onPress: () => navigation.goBack(),
          //   iconStyle: {color: '#000'},
        }}
        centerComponent={{
          text: 'الخطة الشهرية',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        // rightComponent={{icon: 'home', color: '#000'}}
      />
      <HStack
        space={5}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: hp('10%'),
        }}>
        <VStack space={5} style={{alignItems: 'center'}}>
          <Pressable onPress={() => navigation.navigate('PlaneDetails')}>
            <Box
              padding={10}
              style={{
                backgroundColor: '#DFF1F1',
                //   padding: '10%',
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Icon
                name={'text-box-check-outline'}
                type={'material-community'}
                color={colors.primary}
                size={wp('20%')}
              />
            </Box>
          </Pressable>
          <Text
            style={[
              styles.loginBtn,
              {
                color: colors.black,
                marginHorizontal: 5,
                fontSize: 16,
              },
            ]}>
            الخطة الأصلية
          </Text>
        </VStack>
        <VStack space={5} style={{alignItems: 'center'}}>
          <Pressable onPress={() => navigation.navigate('PlaneDetails')}>
            <Box
              padding={10}
              style={{
                backgroundColor: '#DFF1F1',
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Icon
                name={'calendar-sync'}
                type={'material-community'}
                color={colors.primary}
                size={wp('20%')}
              />
            </Box>
          </Pressable>
          <Text
            style={[
              styles.loginBtn,
              {
                color: colors.black,
                marginHorizontal: 5,
                fontSize: 16,
              },
            ]}>
            الخطة الفعلية
          </Text>
        </VStack>
      </HStack>
    </SafeAreaView>
  );
};

export default MonthlyPlanSelection;
