import React, {useState} from 'react';
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
import {FAB, Header, SearchBar} from 'react-native-elements';
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
import {putEditProfile} from '../../redux/actions/Index';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Departments = props => {
  const navigation = useNavigation();
  const renderItems = ({item}) => (
    <VStack
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
      }}>
      <HStack style={{justifyContent: 'space-between'}}>
        <HStack style={{justifyContent: 'space-evenly'}}>
          <Avatar source={images.avatar_new} size="sm" />
          <Text style={styles.address3}>قسم الرياضيات</Text>
        </HStack>
        <Text style={styles.address3}>٣ ساعات</Text>
      </HStack>
      <HStack style={{justifyContent: 'space-evenly'}}>
        <Text style={styles.address3}>الإجمالي ١٥</Text>
        <Text style={styles.address3}>مكتمل ١٠</Text>
        <Text style={styles.address3}>غير مكتمل ٥</Text>
      </HStack>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('ManagerPlans')}>
        <Text style={[styles.address3, {color: colors.black}]}>
          عرض المشرفين
        </Text>
      </Pressable>
    </VStack>
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={[{}, {}, {}, {}, {}]}
        // keyExtractor={item => item.id}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Departments;
