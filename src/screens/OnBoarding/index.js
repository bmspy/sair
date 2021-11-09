import React,{ Component } from 'react';
import { View, Text, Image, Pressable, Platform } from 'react-native';
import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
import { images } from '../../config';

const slides = [
    {
      key: 'one',
      title: 'Title 1',
      text: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.      ',
      image: images.onBoarding,
      backgroundColor: '#59b2ab',
    },
    {
      key: 'two',
      title: 'Title 2',
      text: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.      ',
      image: images.onBoarding,
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'Rocket guy',
      text: 'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.      ',
      image: images.onBoarding,
      backgroundColor: '#22bcb5',
    }
  ];  
export default class OnBoarding extends Component{

    constructor(props){
        super(props)
        this.state = {
            showRealApp: false,
            next:false
          }
    }

    _renderItem = ({ item }) => {
        return (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Image style={styles.img} source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
            <View style={styles.skip}>
             <Pressable  onPress={()=>this.props.navigation.navigate('SignIn')} >
              <Text style={[styles.text,Platform.OS == 'ios'&&{marginTop:'25%'}]}>تخطي</Text>
             </Pressable>
          </View>
          </View>
        );
      }
      _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
      }

      _renderNextButton = () => {
        // this.setState({next:false})
        return(
          <View style={styles.btn}>
          <Text style={styles.next}>التالي</Text>
       </View>)
      }

      _renderDoneButton = () => {
        // this.setState({done:true})
        return(
          <Pressable onPress={()=>this.props.navigation.navigate('SignIn')} style={styles.btn}>
            <Text style={styles.next}>تسجيل الدخول</Text>
          </Pressable>
         )
      }

    render(){
        return(
            <View style={styles.container}>
                <AppIntroSlider
                  activeDotStyle= {styles.activeDotStyle}
                  dotStyle= {styles.dotStyle}
                  renderNextButton={this._renderNextButton}
                  renderDoneButton={this._renderDoneButton}
                  renderItem={this._renderItem} 
                  data={slides} 
                  onDone={this._onDone}/>
            </View>
        )
    }

}