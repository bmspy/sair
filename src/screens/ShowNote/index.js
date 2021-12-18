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
import ImagePicker from 'react-native-image-crop-picker';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ShowNote = props => {
  const navigation = useNavigation();
  const toast = useToast();
  const [image, setImage] = useState(props.note?.image);
  const [title, setTitle] = useState(props.note?.title);
  const [content, setContent] = useState(props.note?.content);

  return (
    <View
      style={{backgroundColor: colors.white, width: '100%', height: '100%'}}>
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
            <Text style={styles.address}> أكتوبر 5 , 2021 </Text>
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
          {image ? (
            <Image
              source={{uri: image}}
              style={{width: wp('40%'), height: wp('40%'), alignSelf: 'center'}}
            />
          ) : null}

        </View>
      </Pressable>
    </View>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
  note: state.note.note,
});

const mapDispatchToProps = dispatch => ({
  onPostCreateNote: (formData, navigateToTarget, regToast) =>
    dispatch(postCreateNote(formData, navigateToTarget, regToast)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowNote);
