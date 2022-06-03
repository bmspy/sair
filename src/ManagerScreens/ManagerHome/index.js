import React, {useState, useEffect, useCallback} from 'react';
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
  BackHandler,
  Alert,
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
import {setPlan} from '../../redux/actions/Index';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {API_URL} from '@env';
import Departments from './departments';
// import LoadingModal from '../../components/LoadingModal/index';

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


const ManagerHome = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'MM'));
  const [isLoading, setIsLoading] = useState(false);
  const [noDepartments, setNoDepartments] = useState(false);
  const [homeContent, setHomeContent] = useState([]);
  const [reload, setReload] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    const getHomePage = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(`${API_URL}get/manager/homepage/`, {
        params: {
          month: selectedMonth,
          year: format(new Date(), 'yyyy'),
        },
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      // console.log(response.data);
      if (!response.data.length) {
        setIsLoading(false);
        setNoDepartments(true);
      } else {
        setIsLoading(false);
        setNoDepartments(false);
        setHomeContent(response.data);
      }
    };
    getHomePage();
  }, [selectedMonth, props.reload, reload]);

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

  const handleSelectMonth = month => {
    setSelectedMonth(month);
    setHomeContent([]);
  };

  const renderMonths = ({item}) => (
    <Pressable
      onPress={() => handleSelectMonth(item.id)}
      style={{
        width: wp('15%'),
        height: wp('20%'),
        backgroundColor:
          item.id == selectedMonth ? colors.primary : colors.white,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={[
          styles.address3,
          {
            color: item.id == selectedMonth ? colors.white : colors.primary,
            fontSize: 12,
          },
        ]}>
        {item.name}
      </Text>
    </Pressable>
  );
  
  const handleManagerPlans = item => {
    props.onSetPlan(item);
    navigation.navigate('ManagerPlans');
  };

  const handleSearch = () => {
    // notes.filter(note => {
    // });
    //SEARCH CODE
    try {
      if (search !== '') {
        setIsSearching(true);
        let searchResult = [];
        for (let key in homeContent) {
          //console.log(parsedRes[key].address);
          let homeContentName = homeContent[key].name.toLowerCase();
          if (homeContentName.includes(search.toLowerCase()) && search.trim() !== '') {
            searchResult.push(homeContent[key]);
          }
        }
        console.log(searchResult);
        setHomeContent(searchResult);
      }
    } catch (error) {
      console.log(error);
    }
    
  };

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
          <Text style={styles.address3}>{item.name}</Text>
        </HStack>
        {/* <Text style={styles.address3}>٣ ساعات</Text> */}
      </HStack>
      <HStack style={{justifyContent: 'space-evenly'}}>
        <Text style={styles.address3}>الإجمالي {item.all}</Text>
        <Text style={styles.address3}>مكتمل {item.done}</Text>
        <Text style={styles.address3}>غير مكتمل {item.not_done}</Text>
      </HStack>
      <Pressable
        style={[styles.btn, {backgroundColor: colors.primary}]}
        onPress={() => handleManagerPlans(item)}>
        <Text style={[styles.address3, {color: colors.white}]}>
          عرض المشرفين
        </Text>
      </Pressable>
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
      {/* <LoadingModal message={'يرجى الإنتظار'} loading={props.isLoading} /> */}
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
        rightComponent={<Pressable onPress={() => navigation.navigate('Profile')}><Avatar source={{uri: props.profile.image}} size="sm" /></Pressable>}
      />
      <Text style={[styles.address3, {textAlign: 'center'}]}>
        {format(new Date(), 'dd MMM yyyy', {locale: ar})}
      </Text>
      <SearchBar
        placeholder="بحث عن الاقسام"
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
        onSubmitEditing={handleSearch}
        onClear={() => {
          setReload(!reload);
          setIsSearching(false);
        }}
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
      {isLoading ? (
        <Spinner style={{alignSelf: 'center', flex: 1}} size="lg" />
      ) : noDepartments ? (
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
          showsVerticalScrollIndicator={false}
        />
      )}
      {/* <FlatList
        data={homeContent}
        keyExtractor={item => item.id}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
      /> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  reload: state.ui.reload,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  onSetPlan: (item) => dispatch(setPlan(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHome);
