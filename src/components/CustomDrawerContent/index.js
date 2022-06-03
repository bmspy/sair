import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {
  VStack,
  HStack,
  Modal,
  Actionsheet,
  useDisclose,
  Box,
  Avatar,
  View,
  Divider,
  AlertDialog,
  Button,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {images} from '../../config';
import styles from './styles';
import {connect} from 'react-redux';
import {postLogout} from '../../redux/actions/Index';
import LoadingModal from '../LoadingModal/index';
import useForceUpdate from 'use-force-update';

const CustomDrawerContent = props => {
  const forceUpdate = useForceUpdate();
  const navigation = useNavigation();
  // Alert Dialog
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  // const handleClick = React.useCallback(() => {
  //   alert('I will re-render now.');
  //   forceUpdate();
  // }, [forceUpdate]);

  useEffect(() => {
    forceUpdate();
    // alert('I will re-render now.');
  }, [props.profile?.user_type]);

  const handleLogout = () => {
    onClose();
    props.onPostLogout(navigation.navigate);
  };

  return props.profile?.user_type === 'supervisor' ? (
    <View safeAreaTop style={styles.container}>
      <LoadingModal message={'يرجى الإنتظار'} loading={props.isLoading} />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>تسجيل الخروج</AlertDialog.Header>
          <AlertDialog.Body>هل تريد بالتأكيد تسجيل الخروج؟</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                إلغاء
              </Button>
              <Button colorScheme="danger" onPress={handleLogout}>
                تسجيل الخروج
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Box safeAreaTop />
      <VStack paddingLeft={5} space={1} style={{alignItems: 'flex-start'}}>
        <ImageBackground
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          imageStyle={{
            width: 130,
            height: 130,
            // backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={images.my_avatar_placeholder}>
          <VStack style={{padding: 17}}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Avatar
                key={props.profile.image}
                bg="cyan.500"
                // alignSelf="center"
                size="xl"
                source={{uri: props.profile.image}}
                style={{padding: 10}}
              />
            </Pressable>
          </VStack>
        </ImageBackground>
        <Text style={[styles.address, {}]}>{props.profile?.full_name}</Text>
      </VStack>
      <ScrollView>
        <VStack paddingLeft={7} flex={1}>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>الرئيسية</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>تعديل الملف الشخصي</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('MonthlyVisitsPlane')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>خطة الزيارات الشهرية</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('Notes')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>ملاحظاتي</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('ChangePassword')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>تغيير كلمة المرور</Text>
          </Pressable>

          <Divider marginTop={21} width="85%" opacity={0.6} />

          <Pressable
            onPress={() => navigation.navigate('PrivacyPolicy')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>سياسة الخصوصية</Text>
          </Pressable>

          {/* <Divider orientation='vertical' height={10} marginLeft={1} opacity={0.6} /> */}

          <Pressable
            onPress={() => navigation.navigate('About')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>عن التطبيق</Text>
          </Pressable>

          <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.btn}>
            <Text style={styles.loginBtn}> تسجيل الخروج</Text>
          </Pressable>
        </VStack>
      </ScrollView>
    </View>
  ) : props.profile?.user_type === 'head_of_department' ? (
    <View safeAreaTop style={styles.container}>
      <LoadingModal message={'يرجى الإنتظار'} loading={props.isLoading} />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>تسجيل الخروج</AlertDialog.Header>
          <AlertDialog.Body>هل تريد بالتأكيد تسجيل الخروج؟</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                إلغاء
              </Button>
              <Button colorScheme="danger" onPress={handleLogout}>
                تسجيل الخروج
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Box safeAreaTop />
      <VStack paddingLeft={5} space={1} style={{alignItems: 'flex-start'}}>
        <ImageBackground
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          imageStyle={{
            width: 130,
            height: 130,
            // backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={images.my_avatar_placeholder}>
          <VStack style={{padding: 17}}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Avatar
                key={props.profile.image}
                bg="cyan.500"
                // alignSelf="center"
                size="xl"
                source={{uri: props.profile.image}}
                style={{padding: 10}}
              />
            </Pressable>
          </VStack>
        </ImageBackground>
        <Text style={[styles.address, {}]}>{props.profile?.full_name}</Text>
      </VStack>
      <ScrollView>
        <VStack paddingLeft={7} flex={1}>
          <Pressable
            onPress={() => navigation.navigate('HeadHome')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>الرئيسية</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>تعديل الملف الشخصي</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('ChangePassword')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>تغيير كلمة المرور</Text>
          </Pressable>

          <Divider marginTop={21} width="85%" opacity={0.6} />

          <Pressable
            onPress={() => navigation.navigate('PrivacyPolicy')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>سياسة الخصوصية</Text>
          </Pressable>

          {/* <Divider orientation='vertical' height={10} marginLeft={1} opacity={0.6} /> */}

          <Pressable
            onPress={() => navigation.navigate('About')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>عن التطبيق</Text>
          </Pressable>

          <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.btn}>
            <Text style={styles.loginBtn}> تسجيل الخروج</Text>
          </Pressable>
        </VStack>
      </ScrollView>
    </View>
  ) : props.profile?.user_type === 'director_of_service' ? (
    <View safeAreaTop style={styles.container}>
      <LoadingModal message={'يرجى الإنتظار'} loading={props.isLoading} />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>تسجيل الخروج</AlertDialog.Header>
          <AlertDialog.Body>هل تريد بالتأكيد تسجيل الخروج؟</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                إلغاء
              </Button>
              <Button colorScheme="danger" onPress={handleLogout}>
                تسجيل الخروج
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Box safeAreaTop />
      <VStack paddingLeft={5} space={1} style={{alignItems: 'flex-start'}}>
        <ImageBackground
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          imageStyle={{
            width: 130,
            height: 130,
            // backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={images.my_avatar_placeholder}>
          <VStack style={{padding: 17}}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Avatar
                key={props.profile.image}
                bg="cyan.500"
                // alignSelf="center"
                size="xl"
                source={{uri: props.profile.image}}
                style={{padding: 10}}
              />
            </Pressable>
          </VStack>
        </ImageBackground>
        <Text style={[styles.address, {}]}>{props.profile?.full_name}</Text>
      </VStack>
      <ScrollView>
        <VStack paddingLeft={7} flex={1}>
          <Pressable
            onPress={() => navigation.navigate('ManagerHome')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>الرئيسية</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>تعديل الملف الشخصي</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('ChangePassword')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>تغيير كلمة المرور</Text>
          </Pressable>

          <Divider marginTop={21} width="85%" opacity={0.6} />

          <Pressable
            onPress={() => navigation.navigate('PrivacyPolicy')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>سياسة الخصوصية</Text>
          </Pressable>

          {/* <Divider orientation='vertical' height={10} marginLeft={1} opacity={0.6} /> */}

          <Pressable
            onPress={() => navigation.navigate('About')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>عن التطبيق</Text>
          </Pressable>

          <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.btn}>
            <Text style={styles.loginBtn}> تسجيل الخروج</Text>
          </Pressable>
        </VStack>
      </ScrollView>
    </View>
  ) : props.profile?.user_type === 'driver' ? (
    <View safeAreaTop style={styles.container}>
      <LoadingModal message={'يرجى الإنتظار'} loading={props.isLoading} />
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>تسجيل الخروج</AlertDialog.Header>
          <AlertDialog.Body>هل تريد بالتأكيد تسجيل الخروج؟</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}>
                إلغاء
              </Button>
              <Button colorScheme="danger" onPress={handleLogout}>
                تسجيل الخروج
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Box safeAreaTop />
      <VStack paddingLeft={5} space={1} style={{alignItems: 'flex-start'}}>
        <ImageBackground
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          imageStyle={{
            width: 130,
            height: 130,
            // backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          source={images.my_avatar_placeholder}>
          <VStack style={{padding: 17}}>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Avatar
                key={props.profile.image}
                bg="cyan.500"
                // alignSelf="center"
                size="xl"
                source={{uri: props.profile.image}}
                style={{padding: 10}}
              />
            </Pressable>
          </VStack>
        </ImageBackground>
        <Text style={[styles.address, {}]}>{props.profile?.full_name}</Text>
      </VStack>
      <ScrollView>
        <VStack paddingLeft={7} flex={1}>
          <Pressable
            onPress={() => navigation.navigate('DriverHome')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>الرئيسية</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('DriverPlan')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>عرض الخطة الشهرية</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>تعديل الملف الشخصي</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('ChangePassword')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>تغيير كلمة المرور</Text>
          </Pressable>

          <Divider marginTop={21} width="85%" opacity={0.6} />

          <Pressable
            onPress={() => navigation.navigate('PrivacyPolicy')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>سياسة الخصوصية</Text>
          </Pressable>

          {/* <Divider orientation='vertical' height={10} marginLeft={1} opacity={0.6} /> */}

          <Pressable
            onPress={() => navigation.navigate('About')}
            style={styles.itemView}>
            <View style={styles.dot} />
            <Text style={styles.address1}>عن التطبيق</Text>
          </Pressable>

          <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.btn}>
            <Text style={styles.loginBtn}> تسجيل الخروج</Text>
          </Pressable>
        </VStack>
      </ScrollView>
    </View>
  ) : (
    handleLogout
  );
};

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  profile: state.user?.profile,
});

const mapDispatchToProps = dispatch => ({
  onPostLogout: navigateToTarget => dispatch(postLogout(navigateToTarget)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomDrawerContent);

// Developed by Mustafa Alabadla
