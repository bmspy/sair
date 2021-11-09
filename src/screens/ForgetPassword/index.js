import React,{ Component } from 'react';
import { View, Text, ImageBackground, Image, TextInput, Pressable } from 'react-native';
import { colors, images } from '../../config';
import styles from './styles';

export default class ForgetPassword extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <ImageBackground source={images.signin} 
                             style={styles.container} 
                             imageStyle={styles.containerImge}>
                <View style={styles.header}>
                    <Text style={styles.address}> نسيت كلمة المرور</Text>
                </View>
                <Image style={styles.img} source={images.forgot_password}/>
                <Text style={styles.hello}> قم بكتابة بريدك الالكتروني لتتمكن من استرجاع كلمة المرور</Text>
                <Text style={styles.label}>البريد الالكتروني </Text>
                <TextInput placeholder={'patrick.cunningham@mail.com'} placeholderTextColor={colors.white} style={styles.input}/>
                
                <Pressable onPress={()=>this.props.navigation.navigate('SignIn')} style={styles.btn}>
                    <Text style={styles.loginBtn}> ارسال</Text>
                </Pressable>

                <Pressable  onPress={()=>this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.forgetText}>انشاء حساب جديد</Text>
                </Pressable>
                
                <Pressable  style={styles.newAccount} onPress={()=>this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.newAccountText}>يوجد مشكلة ؟ مساعدة</Text>
                </Pressable>
            </ImageBackground>
        )
    }

}