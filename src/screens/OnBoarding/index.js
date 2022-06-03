import React, {useState} from 'react';
import {View, Text, Image, Pressable, Platform, StatusBar} from 'react-native';
import {VStack} from 'native-base';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import {images} from '../../config';
import {useNavigation} from '@react-navigation/native';

const slides = [
  {
    key: 'one',
    title: 'المميزات',
    text: 'تحسين عمل الزيارات الشهرية الميدانية و الخطط الشهرية للمشرفين و باقي الموظفين',
    image: images.onBoarding,
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'المميزات',
    text: 'بامكانك وضع خطتك الشهرية بكل سهولة و يسر',
    image: images.onBoarding,
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'المميزات',
    text: 'متابعة خطط زياراتك الشهرية بكل بساطة و في اي مكان كنت دون الحاجة لتواجدك في مقر العمل',
    image: images.onBoarding,
    backgroundColor: '#22bcb5',
  },
];
const OnBoarding = props => {
  const navigation = useNavigation();
  const [showRealApp, setShowRealApp] = useState(false);
  const [next, setNext] = useState(false);

  const renderItem = ({item}) => {
    return (
      <VStack style={styles.slide} space={3}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.img} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
        <View style={styles.skip}>
          {/* <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text
              style={[styles.text, Platform.OS == 'ios' && {marginTop: '25%'}]}>
              تخطي
            </Text>
          </Pressable> */}
        </View>
      </VStack>
    );
  };
  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setShowRealApp(true);
  };

  const renderNextButton = () => {
    // this.setState({next:false})
    return (
      <View style={styles.btn}>
        <Text style={styles.next}>التالي</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    // this.setState({done:true})
    return (
      <Pressable
        onPress={() => navigation.navigate('SignIn')}
        style={styles.btn}>
        <Text style={styles.next}>تسجيل الدخول</Text>
      </Pressable>
    );
  };

  const renderSkipButton = () => {
    // this.setState({done:true})
    return (
      <Pressable style={{justifyContent: 'center'}} onPress={() => navigation.navigate('SignIn')}>
        <Text
          style={[styles.text, { marginHorizontal: '43%', bottom: 100}]}>
          تخطي
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <AppIntroSlider
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        renderItem={renderItem}
        data={slides}
        onDone={onDone}
        skipLabel='تخطي'
        renderSkipButton={renderSkipButton}
        showSkipButton
        onSkip={() => navigation.navigate('SignIn')}
      />
    </View>
  );
};

export default OnBoarding;
