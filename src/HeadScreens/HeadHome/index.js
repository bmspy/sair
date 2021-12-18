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
import Supervisors from './supervisors';

// const FirstRoute = props => {
//   const navigation = useNavigation();
//   const renderItems = ({item}) => (
//     <VStack style={{width: '90%', alignSelf: 'center', backgroundColor: colors.white, marginVertical: 10, padding: 10, borderRadius: 10}}>
//       <HStack style={{justifyContent: 'space-between'}}>
//         <HStack style={{justifyContent: 'space-evenly'}}>
//           <Avatar source={images.avatar_new} size="sm" />
//           <Text style={styles.address3}>قسم الرياضيات</Text>
//         </HStack>
//         <Text style={styles.address3}>٣ ساعات</Text>
//       </HStack>
//       <HStack style={{justifyContent: 'space-evenly'}}>
//         <Text style={styles.address3}>الإجمالي ١٥</Text>
//         <Text style={styles.address3}>مكتمل ١٠</Text>
//         <Text style={styles.address3}>غير مكتمل ٥</Text>
//       </HStack>
//       <Pressable style={styles.btn} onPress={() => navigation.navigate('ManagerPlans')}>
//         <Text style={[styles.address3, {color: colors.black}]}>عرض المشرفين</Text>
//       </Pressable>
//     </VStack>
//   );
//   return (
//     <View style={{flex: 1}}>
//       <FlatList
//         data={[{}, {}, {}, {}, {}]}
//         // keyExtractor={item => item.id}
//         renderItem={renderItems}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

const SecondRoute = () => <View style={{flex: 1}} />;

const ThirdRoute = () => <View style={{flex: 1}} />;


const renderScene = SceneMap({
  first: Supervisors,
  second: SecondRoute,
  third: ThirdRoute,
});

const HeadHome = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [monthIndex, setMonthIndex] = useState(0);

  const monthsText = [
    {
      id: 1,
      name: 'يناير',
    },
    {
      id: 2,
      name: 'فبراير',
    },
    {
      id: 3,
      name: 'مارس',
    },
    {
      id: 4,
      name: 'أبريل',
    },
    {
      id: 5,
      name: 'مايو',
    },
    {
      id: 6,
      name: 'يونيو',
    },
    {
      id: 7,
      name: 'يوليو',
    },
    {
      id: 8,
      name: 'أغسطس',
    },
    {
      id: 9,
      name: 'سبتمبر',
    },
    {
      id: 10,
      name: 'أكتوبر',
    },
    {
      id: 11,
      name: 'نوفمبر',
    },
    {
      id: 12,
      name: 'ديسمبر',
    },
  ];

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'الجميع'},
    {key: 'second', title: 'ذكر'},
    {key: 'third', title: 'أنثى'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      //   labelStyle={{color: '#000'}}
      style={{backgroundColor: '#F2F2F2'}}
      // scrollEnabled
      renderLabel={({route, focused, color}) => (
        <Text
          style={[
            styles.address3,
            {color: focused ? colors.primary : '#000', margin: 8},
          ]}>
          {route.title}
        </Text>
      )}
    />
  );

  const renderMonths = ({item}) => (
    <Pressable
      onPress={() => setMonthIndex(item.id - 1)}
      style={{
        width: wp('15%'),
        height: wp('20%'),
        backgroundColor:
          item.id - 1 === monthIndex ? colors.primary : colors.white,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={[
          styles.address3,
          {
            color: item.id - 1 === monthIndex ? colors.white : colors.primary,
            fontSize: 12,
          },
        ]}>
        {item.name}
      </Text>
    </Pressable>
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
        leftComponent={
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image source={images.menuBar} />
          </Pressable>
        }
        // leftComponent={{
        //   icon: 'keyboard-arrow-right',
        //   color: '#000',
        //   type: 'material',
        //   size: 30,
        //   onPress: () => navigation.goBack(),
        //   //   iconStyle: {color: '#000'},
        // }}
        centerComponent={{
          text: 'الرئيسية',
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
      <SearchBar
        placeholder="بحث عن المشرفين"
        onChangeText={setSearch}
        value={search}
        lightTheme={true}
        theme={{containerStyle: ''}}
        containerStyle={{
          backgroundColor: '#F2F2F2',
          borderColor: '#F2F2F2',
          borderTopColor: '#F2F2F2',
          borderBottomColor: '#F2F2F2',
          paddingHorizontal: 20,
          marginTop: 10,
        }}
        inputContainerStyle={{backgroundColor: '#FFF', borderRadius: 15}}
        inputStyle={{backgroundColor: '#FFF', textAlign: 'right'}}
        onSubmitEditing={() => alert('Submitted!')}
        // style={{borderWidth: 1}}
      />
      <Box style={{marginVertical: 10}}>
        <FlatList
          data={monthsText}
          keyExtractor={item => item.id}
          renderItem={renderMonths}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Box>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: '100%'}}
        renderTabBar={renderTabBar}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(HeadHome);
