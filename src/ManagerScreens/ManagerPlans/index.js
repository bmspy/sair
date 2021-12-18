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

const ManagerPlans = props => {
  const navigation = useNavigation();
  const toast = useToast();

  const renderItems = ({item}) => (
    <VStack style={{width: '90%', alignSelf: 'center', backgroundColor: colors.white, marginVertical: 10, padding: 10, borderRadius: 10}}>
      <HStack style={{justifyContent: 'space-between'}}>
        <HStack style={{justifyContent: 'space-evenly'}}>
          <Avatar source={images.avatar_new} size="sm" />
          <Text style={styles.address3}>محمد محمد</Text>
        </HStack>
        <Text style={[styles.address3, {color: 'rgba(0, 0, 0, 0.35)'}]}>٣ ساعات</Text>
      </HStack>
      <HStack style={{paddingHorizontal:40}}>
        <Text style={[styles.address3, {color: 'rgba(0, 0, 0, 0.35)'}]}>مشرف رياضيات</Text>
      </HStack>
      <HStack style={{justifyContent: 'space-around'}}>
      <Pressable style={[styles.btn, {width: '40%'}]}>
        <Text style={[styles.address3, {color: colors.black}]}>عرض الخطة</Text>
      </Pressable>
      <Pressable style={[styles.btn, {width: '40%', backgroundColor: colors.primary}]}>
        <Text style={[styles.address3, {color: colors.white}]}>اعتماد الخطة</Text>
      </Pressable>
      </HStack>
    </VStack>
  );

  return (
    <SafeAreaView
      style={{backgroundColor: '#F2F2F2', width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        containerStyle={{width: '90%', alignSelf: 'center'}}
        backgroundColor="#F2F2F2"
        // leftComponent={
        //   <Pressable onPress={() => navigation.openDrawer()}>
        //     <Image source={images.menuBar} />
        //   </Pressable>
        // }
        leftComponent={{
          icon: 'keyboard-arrow-right',
          color: '#000',
          type: 'material',
          size: 30,
          onPress: () => navigation.goBack(),
          //   iconStyle: {color: '#000'},
        }}
        centerComponent={{
          text: 'اعتماد خطط الأقسام',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        rightComponent={<Avatar source={images.avatar_new} size="sm" />}
      />
      <Text style={[styles.address3, {textAlign: 'center'}]}>
        {format(new Date(), 'dd MMM yyyy', {locale: ar})}
      </Text>
      {/* <Box style={{marginVertical: 10}}> */}
        <FlatList
          data={[{}, {}, {}, {}, {}]}
          // keyExtractor={item => item.id}
          renderItem={renderItems}
        />
      {/* </Box> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  // onPutEditProfile: (formData, navigateToTarget, regToast) => dispatch(putEditProfile(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPlans);
