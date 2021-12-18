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

const Supervisors = props => {
  const navigation = useNavigation();
  const renderItems = ({item}) => (
    <VStack
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: colors.white,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
      }}>
      <HStack style={{justifyContent: 'space-between'}}>
        <HStack style={{justifyContent: 'space-evenly'}}>
          <Avatar source={images.avatar_new} size="sm" />
          <Text style={styles.address3}>محمد محمد</Text>
        </HStack>
        <Text style={[styles.address3, {color: 'rgba(0, 0, 0, 0.35)'}]}>٣ ساعات</Text>
      </HStack>
      <HStack style={{marginHorizontal: 40}}>
        <Text style={[styles.address3, {color: 'rgba(0, 0, 0, 0.35)'}]}>مشرف رياضيات</Text>
      </HStack>
      <Pressable
        style={[styles.btn, {backgroundColor: colors.primary}]}
        onPress={() => alert('Go to plan details')}>
        <Text style={[styles.address3, {color: colors.white}]}>
          عرض الخطة الشهرية
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

export default Supervisors;
