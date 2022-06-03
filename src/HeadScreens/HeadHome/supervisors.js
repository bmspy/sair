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
import {setMonthPlanId, setPlanDetailsDate, setPlan} from '../../redux/actions/Index';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useFocus} from 'native-base/lib/typescript/components/primitives/Pressable/Pressable';

const Supervisors = props => {
  // useEffect(() => {
  //   console.log(props.homeContent);
  // }, []);
  const navigation = useNavigation();

  const handleShowPlan = (monthPlanId, supervisor) => {
    const planDetailsDate = {
      planDetailsMonth: `${props.planMonth}`.replace(/^(\d)$/, '0$1').toString(),
      planDetailsYear: format(new Date(), 'yyyy'),
    };
    props.onSetPlanDetailsDate(planDetailsDate);
    props.onSetMonthPlanId(monthPlanId);
    props.onSetPlan(supervisor);
    navigation.navigate('HeadPlan');
  };

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
          <Avatar source={{uri: item.image}} size="sm" />
          <Text style={styles.address3}>{item.full_name}</Text>
        </HStack>
        {/* <Text style={[styles.address3, {color: 'rgba(0, 0, 0, 0.35)'}]}>
          ٣ ساعات
        </Text> */}
      </HStack>
      <HStack style={{marginHorizontal: 40}}>
        <Text style={[styles.address3, {color: 'rgba(0, 0, 0, 0.35)'}]}>
        {item.job}
        </Text>
      </HStack>
      <Pressable
        style={[styles.btn, {backgroundColor: colors.primary}]}
        onPress={() => handleShowPlan(item.id, item)}>
        <Text style={[styles.address3, {color: colors.white}]}>
          عرض الخطة الشهرية
        </Text>
      </Pressable>
    </VStack>
  );
  return (
    <View style={{flex: 1}}>
      {props.isLoadingProp ? (
        <Spinner style={{alignSelf: 'center', flex: 1}} size="lg" />
      ) : props.noSupervisors ? (
        <VStack
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={[styles.address, {color: colors.primary}]}>
            لا يوجد أي خطة في هذا الشهر
          </Text>
        </VStack>
      ) : (
        <FlatList
          data={props.homeContent}
          // keyExtractor={item => item.id}
          renderItem={renderItems}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  reload: state.ui.reload,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onSetMonthPlanId: monthPlanId =>
    dispatch(setMonthPlanId(monthPlanId)),
    onSetPlanDetailsDate: planDetailsDate =>
    dispatch(setPlanDetailsDate(planDetailsDate)),
    onSetPlan: plan =>
    dispatch(setPlan(plan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Supervisors);
