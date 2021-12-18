import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  SafeAreaView,
  StatusBar,
  Keyboard,
  Image,
} from 'react-native';
import {Icon} from '../../components';
import {colors} from '../../config';
import styles from './styles';
import {Tab, TabView, SearchBar, Header} from 'react-native-elements';
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
import {postCreateNote} from '../../redux/actions/Index';
import {format} from 'date-fns';
import {ar} from 'date-fns/locale';
import ImagePicker from 'react-native-image-crop-picker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const AddNote = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('عنوان الملاحظة');
  const [content, setContent] = useState(
    'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.' +
      ' إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.' +
      'ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق. ',
  );

  //IMAGE UPLOAD FUNCTIONS
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1280,
      compressImageMaxHeight: 720,
      //cropping: true,
      //multiple: true,
      compressImageQuality: 0.8,
    })
      .then(image => {
        // console.log(image.path);
        // console.log(image);
        setImage(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCreateNote = () => {
    let imageFile = {};
    if (image?.path) {
      imageFile = {
        uri: image.path,
        type: image.mime,
        name: 'avatar.jpg',
      };
    }
    const formData = new FormData();
    formData.append('date', format(new Date(), 'yyyy-MM-dd'));
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', imageFile);
    props.onPostCreateNote(formData, navigation.navigate, toast);
  };

  return (
    <View style={{backgroundColor: colors.white, width: '100%', height: '100%'}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <Box safeArea />
        <View style={styles.sideHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon
              type={'material'}
              size={30}
              name={'keyboard-arrow-right'}
              color={colors.black}
            />
          </Pressable>
          <HStack>
            {/* <Text style={styles.address}>{props.noteDate}</Text> */}
            <Text style={styles.address}>{format(new Date(props.noteDate) || new Date(), 'dd MMM yyyy', {locale: ar})}</Text>
          </HStack>
        </View>
        <View style={styles.content}>
          <TextInput
            style={styles.text}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.text}
            multiline
            numberOfLines={17}
            value={content}
            onChangeText={setContent}
          />
          <Image source={{uri: image?.path}} style={{width: wp('40%'), height: wp('40%'), alignSelf: 'center'}} />
          <Box style={{justifyContent: 'flex-end', flex: 1, marginBottom: 20}}>
          <View style={styles.footer}>
            <Icon
              onPress={choosePhotoFromLibrary}
              type={'entypo'}
              size={25}
              name={'images'}
              color={colors.white}
            />
            <Icon
              onPress={handleCreateNote}
              type={'material'}
              size={30}
              name={'check'}
              color={colors.white}
            />
          </View>
          </Box>
        </View>
      </Pressable>
    </View>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  noteDate: state.note.noteDate,
});

const mapDispatchToProps = dispatch => ({
  onPostCreateNote: (formData, navigateToTarget, regToast) =>
    dispatch(postCreateNote(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
