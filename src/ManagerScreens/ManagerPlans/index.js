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
  Spinner,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {postApproveRequest, setMonthPlanId} from '../../redux/actions/Index';
import {format, differenceInHours} from 'date-fns';
import {ar} from 'date-fns/locale';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

const ManagerPlans = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [noSupervisors, setNoSupervisors] = useState(false);
  const [homeContent, setHomeContent] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getHomePage = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(`${API_URL}get/department/supervisors/`, {
        params: {
          department: props.plan.id,
          month: props.plan.month,
          year: props.plan.year,
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(response.data);
      if (!response.data.length) {
        setIsLoading(false);
        setNoSupervisors(true);
      } else {
        setIsLoading(false);
        setNoSupervisors(false);
        setHomeContent(response.data);
      }
    };
    getHomePage();
  }, [props.reload]);

  const handleApproveRequest = async id => {
    const formData = new FormData();
    formData.append('month_plan', id);
    props.onPostApproveRequest(formData, toast);
  }

  const handleShowPlan = monthPlanId => {
    props.onSetMonthPlanId(monthPlanId);
    navigation.navigate('ManagerPlan');
  };

  const renderItems = ({item}) => (
    <VStack style={{width: '90%', alignSelf: 'center', backgroundColor: colors.white, marginVertical: 10, padding: 10, borderRadius: 10}}>
      <HStack style={{justifyContent: 'space-between'}}>
        <HStack style={{justifyContent: 'space-evenly'}}>
          <Avatar source={{uri: item.image}} size="sm" />
          <Text style={styles.address3}>{item.full_name}</Text>
        </HStack>
        {
          item.approved_request && !item.approved ? (
            <Text style={[styles.address3, {color: 'rgba(0, 0, 0, 0.35)'}]}>{differenceInHours(new Date(), new Date(item.approved_request_time))} ساعة</Text>
          ) : null
        }
      </HStack>
      <HStack style={{paddingHorizontal:40}}>
        <Text style={[styles.address3, {color: 'rgba(0, 0, 0, 0.35)'}]}>{item.job}</Text>
      </HStack>
      <HStack style={{justifyContent: 'space-around'}}>
      <Pressable onPress={() => handleShowPlan(item.id)} style={[styles.btn, {width: '40%', backgroundColor: colors.primary}]}>
        <Text style={[styles.address3, {color: colors.white}]}>عرض الخطة</Text>
      </Pressable>
      <Pressable onPress={() => item.approved_request && !item.approved ? handleApproveRequest(item.id) : null} style={[styles.btn, {width: '40%', backgroundColor: item.approved_request && !item.approved ? colors.primary : 'rgba(0, 0, 0, 0.23)'}]}>
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
        rightComponent={<Pressable onPress={() => navigation.navigate('Profile')}><Avatar source={{uri: props.profile.image}} size="sm" /></Pressable>}
      />
      <Text style={[styles.address3, {textAlign: 'center'}]}>
        {format(new Date(), 'dd MMM yyyy', {locale: ar})}
      </Text>
      {/* <Box style={{marginVertical: 10}}> */}
      {isLoading ? (
        <Spinner style={{alignSelf: 'center', flex: 1}} size="lg" />
      ) : noSupervisors ? (
        <VStack
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={[styles.address, {color: colors.primary}]}>
            لا يوجد أي خطة في هذا الشهر
          </Text>
        </VStack>
      ) : (
        <FlatList
          data={homeContent}
          keyExtractor={item => item.id}
          renderItem={renderItems}
        />
      )}
       
      {/* </Box> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  reload: state.ui.reload,
  profile: state.user.profile,
  plan: state.plan.plan,
});

const mapDispatchToProps = dispatch => ({
  onPostApproveRequest: (formData, regToast) => dispatch(postApproveRequest(formData, regToast)),
  onSetMonthPlanId: monthPlanId =>
    dispatch(setMonthPlanId(monthPlanId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPlans);
