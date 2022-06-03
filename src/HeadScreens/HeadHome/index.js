//HEAD HOME
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
import {uiStartLoading, uiStopLoading} from '../../redux/actions/Index';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {useFocusEffect} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Supervisors from './supervisors';
// import LoadingModal from '../../components/LoadingModal/index';

const HeadHome = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  // const [monthIndex, setMonthIndex] = useState(1);

  // GET HOME CONTENT
  const [gender, setGender] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'MM'));
  const [isLoading, setIsLoading] = useState(false);
  const [noSupervisors, setNoSupervisors] = useState(false);
  const [homeContent, setHomeContent] = useState([]);
  const [reload, setReload] = useState(false);
  // const [selectedYear, setGender] = useState(0);

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

  const renderScene = SceneMap({
    first: () => <Supervisors homeContent={homeContent} noSupervisors={noSupervisors} isLoadingProp={isLoading} planMonth={selectedMonth} />,
    second: () => <Supervisors homeContent={homeContent} noSupervisors={noSupervisors} isLoadingProp={isLoading} planMonth={selectedMonth}  />,
    third: () => <Supervisors homeContent={homeContent} noSupervisors={noSupervisors} isLoadingProp={isLoading} planMonth={selectedMonth}  />,
  });

  useEffect(() => {
    setIsLoading(true);
    const getHomePage = async () => {
      const token = await AsyncStorage.getItem('id_token');
      const response = await axios.get(`${API_URL}get/department/homepage/`, {
        params: {
          gender: index,
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
        setNoSupervisors(true);
      } else {
        setIsLoading(false);
        setNoSupervisors(false);
        setHomeContent(response.data);
      }
    };
    getHomePage();
  }, [selectedMonth, index, props.reload, reload]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      //   labelStyle={{color: '#000'}}
      style={{backgroundColor: '#F2F2F2'}}
      // scrollEnabled
      onTabPress={() => setHomeContent([])}
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

  const handleSelectMonth = month => {
    setSelectedMonth(month);
    setHomeContent([]);
  };

  const handleSearch = () => {
    // notes.filter(note => {
    // });
    //SEARCH CODE
    try {
      if (search !== '') {
        // setIsLoading(true);
        setIsSearching(true);
        let searchResult = [];
        for (let key in homeContent) {
          //console.log(parsedRes[key].address);
          let homeContentName = homeContent[key].full_name.toLowerCase();
          let homeContentJob = homeContent[key].job.toLowerCase();
          if ((homeContentName.includes(search.toLowerCase()) || homeContentJob.includes(search.toLowerCase())) && search.trim() !== '') {
            searchResult.push(homeContent[key]);
          }
        }
        console.log(searchResult);
        setHomeContent(searchResult);
        // setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
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
        rightComponent={<Avatar source={{uri: props.profile.image}} size="sm" />}
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
  reload: state.ui.reload,
  profile: state.user.profile,
});

const mapDispatchToProps = dispatch => ({
  // onUiStartLoading: () => dispatch(uiStartLoading()),
  // onUiStopLoading: () => dispatch(uiStopLoading()),
  // onPutEditProfile: (formData, navigateToTarget, regToast) => dispatch(putEditProfile(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeadHome);
