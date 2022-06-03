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
import {Tab, TabView, SearchBar, Header} from 'react-native-elements';
import {
  VStack,
  HStack,
  Modal,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
  Button,
  Spinner,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {setNote} from '../../redux/actions/Index';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '@env';

const Notes = props => {
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('id_token');
      try {
        const resp = await axios.get(`${API_URL}get/notes/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setNotes(resp.data);
        // console.log(resp.data);
        setIsLoading(false);
      } catch (err) {
        // Handle Error Here
        setIsLoading(false);
        console.error(err);
      }

      // await getToken()
      //   .then(token => {
      //     // console.log(token);
      //     const response = await axios
      //       .get('http://sair.ghaith.om/get/notes/', {
      //         headers: {
      //           Authorization: `Token ${token}`,
      //         },
      //       })
      //       .then(res => {
      //         // dispatch(uiStopLoading());
      //         // console.log(res.data);
      //         setNotes(res.data.results);
      //         // toast.show({
      //         //   description: 'تم تعديل البيانات بنجاح',
      //         // });
      //       })
      //       .catch(error => {
      //         // dispatch(uiStopLoading());
      //         if (error.response) {
      //           // console.log(error.response.data);
      //           // Object.keys(error.response.data).forEach((item, idx) =>
      //           //   console.log(`${item}: ${error.response.data[item]}`),
      //           // );
      //           // const errorLog = Object.keys(error.response.data).map(
      //           //   (item, idx) => `${item}: ${error.response.data[item]}`,
      //           // );
      //           // console.log(errorLog);
      //           // Alert.alert(
      //           //   'حدث خطأ أثناء عملية تعديل الملف الشخصي',
      //           //   error.response.data.map(item => `${item}`).join('\n'),
      //           // );
      //           // Alert.alert('Error', JSON.stringify(error.response.data, null, 2));
      //           // alert(error.response.data.JSON.strigify());
      //           // console.log(error.response.status);
      //           // console.log(error.response.headers);
      //         }
      //       });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    };

    // const getDepartments = async () => {
    //   await fetch('http://sair.ghaith.om/get/departments/')
    //     .then(res => res.json())
    //     .then(parsedRes => {
    //       setDeps(parsedRes);
    //     });
    //   // const res = deps.json();
    // };

    getNotes();
  }, [reload]);

  const handleSearch = () => {
    // notes.filter(note => {
    // });
    //SEARCH CODE
    try {
      if (search !== '') {
        setIsSearching(true);
        let searchResult = [];
        for (let key in notes) {
          //console.log(parsedRes[key].address);
          let noteTitle = notes[key].title.toLowerCase();
          let noteContent = notes[key].content.toLowerCase();
          if ((noteTitle.includes(search.toLowerCase()) || noteContent.includes(search.toLowerCase())) && search.trim() !== '') {
            searchResult.push(notes[key]);
          }
        }
        console.log(searchResult);
        setNotes(searchResult);
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleSetNote = async note => {
    await props.onSetNote(note);
    console.log(note);
    navigation.navigate('ShowNote');
  };

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => handleSetNote(item)}
      style={[
        styles.consultantView,
        {
          backgroundColor:
            item?.id === notes[0]?.id && !isSearching
              ? '#E4F6E3'
              : item?.id === notes[1]?.id && !isSearching
              ? '#F9EEEB'
              : colors.white,
        },
      ]}>
      {(item?.id === notes[0]?.id || item?.id === notes[1]?.id) && !isSearching ? (
        <Text
          style={[
            styles.new,
            {
              backgroundColor:
                item?.id === notes[0]?.id
                  ? '#E4F6E3'
                  : item?.id === notes[1]?.id
                  ? '#F9EEEB'
                  : colors.white,
              //   color:item.index == 0 ?'#E4F6E3':item.index == 1?'#F9EEEB':colors.white
            },
          ]}>
          جديد
        </Text>
      ) : null}

      <VStack style={{paddingHorizontal: '5%', marginTop: 3, flex: 1}}>
        <Text style={[styles.address, {fontSize: 13}]}>
          {format(new Date(item.date), 'dd MMM , yyyy', {locale: ar})}
        </Text>
        {/* <Text style={styles.address}>أكتوبر 5 , 2021</Text> */}
        <Text style={styles.address}>{item.title}</Text>
        <Text style={styles.date} numberOfLines={7}>
          {item.content}
        </Text>
      </VStack>
    </Pressable>
  );

  return (
    <SafeAreaView style={{height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Header
        containerStyle={{width: '90%', alignSelf: 'center'}}
        backgroundColor="#F2F2F2"
        leftComponent={{
          icon: 'keyboard-arrow-right',
          color: '#000',
          type: 'material',
          size: 30,
          onPress: () => navigation.goBack(),
          //   iconStyle: {color: '#000'},
        }}
        // leftComponent={{
        //   icon: 'keyboard-arrow-right',
        //   color: '#000',
        //   type: 'material',
        //   size: 30,
        //   onPress: () => navigation.goBack(),
        //   //   iconStyle: {color: '#000'},
        // }}
        centerComponent={{
          text: 'ملاحظاتي',
          style: [
            {color: '#000', fontSize: 20, fontWeight: 'bold'},
            styles.address,
          ],
        }}
        rightComponent={{
          icon: 'add',
          color: '#000',
          size: 25,
          onPress: () => navigation.navigate('AddNote'),
        }}
      />
      {/* <View style={styles.header}>
        <View style={styles.sideHeader}>
          <Pressable onPress={() => this.props.navigation.pop()}>
            <Icon type={'material'} size={30} name={'keyboard-arrow-right'} />
          </Pressable>

          <View>
            <Text style={styles.address}>ملاحظاتي</Text>
          </View>
          <Pressable style={styles.plusView}>
            <Icon
              name={'plus'}
              type={'AntDesign'}
              color={colors.white}
              size={20}
            />
          </Pressable>
        </View>
      </View> */}
      <SearchBar
        placeholder="ابحث هنا"
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
        }}
        inputContainerStyle={{backgroundColor: '#FFF', borderRadius: 15}}
        inputStyle={{backgroundColor: '#FFF', textAlign: 'right'}}
        onSubmitEditing={handleSearch}
        onClear={() => {
          setReload(!reload);
          setIsSearching(false);
        }}
        
        // onSubmitEditing={() => alert('Submitted!')}
        // style={{borderWidth: 1}}
      />
      {isLoading ? (
        <Spinner style={{alignSelf: 'center', flex: 1}} size="lg" />
      ) : !notes.length ? (
        <Box style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={[styles.address, {color: colors.dimGray}]}>
            لا يوجد أي ملاحظات
          </Text>
        </Box>
      ) : (
        <FlatList
          data={notes}
          numColumns={2}
          style={{alignSelf: 'center'}}
          renderItem={renderItem}
        />
      )}

      {/* <Pressable
        style={{width: 200, height: 50, backgroundColor: colors.deepSkyBlue}}
        onPress={() => console.log(notes)}
      /> */}
      {/* <FlatList
        data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
        numColumns={2}
        style={{alignSelf: 'center'}}
        renderItem={item => {
          return (
            <Pressable
              onPress={() => navigation.navigate('PlaneDetails')}
              style={[
                styles.consultantView,
                {
                  backgroundColor:
                    item.index == 0
                      ? '#E4F6E3'
                      : item.index == 1
                      ? '#F9EEEB'
                      : colors.white,
                },
              ]}>
              {item.index == 0 || item.index == 1 ? (
                <Text
                  style={[
                    styles.new,
                    {
                      backgroundColor:
                        item.index == 0
                          ? '#E4F6E3'
                          : item.index == 1
                          ? '#F9EEEB'
                          : colors.white,
                      //   color:item.index == 0 ?'#E4F6E3':item.index == 1?'#F9EEEB':colors.white
                    },
                  ]}>
                  جديد
                </Text>
              ) : null}

              <VStack style={{paddingHorizontal: '5%', marginTop: 3}}>
                <Text style={styles.address}>أكتوبر 5 , 2021</Text>
                <Text style={styles.date} numberOfLines={8}>
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
                  النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف
                  التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات
                  يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن
                  يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي
                  المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن
                  يطلع على صورة حقيقية لتصميم الموقع. ومن هنا وجب على المصمم أن
                  يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد
                  النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة
                  له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.
                </Text>
              </VStack>
            </Pressable>
          );
        }}
      /> */}
      {/* <Button onPress={() => console.log(format(new Date('2021-12-13'), 'MMM dd, yyyy', {locale: ar}))}>Test</Button> */}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  notes: state.note.notes,
});

const mapDispatchToProps = dispatch => ({
  onSetNote: note => dispatch(setNote(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
