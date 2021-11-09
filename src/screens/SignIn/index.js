import React,{ Component } from 'react';
import { View, Text, ImageBackground, TextInput, Pressable } from 'react-native';
import { colors, images } from '../../config';
import styles from './styles';

export default class SignIn extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <ImageBackground source={images.signin} 
                             style={styles.container} 
                             imageStyle={styles.containerImge}>
                <Text style={styles.address}>تسجيل الدخول</Text>
                <Text style={styles.hello}> ! اهلا بك مجدداً </Text>
                <Text style={styles.label}>الرقم المدني</Text>
                <TextInput placeholder={'378862'} placeholderTextColor={colors.white} style={styles.input}/>
                <Text style={styles.label}>كلمة المرور</Text>
                <TextInput placeholder={'******'} placeholderTextColor={colors.white} style={styles.input} secureTextEntry/>

                <Pressable onPress={()=>this.props.navigation.navigate('MyDrawer',{type:'supervisor'})} style={styles.btn}>
                    <Text style={styles.loginBtn}>تسجيل الدخول</Text>
                </Pressable>

               <Pressable  onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
                    <Text style={styles.forgetText}>نسيت كلمة المرور ؟</Text>         
               </Pressable> 
                <Pressable  style={styles.newAccount} onPress={()=>this.props.navigation.navigate('SignUp')}>
                    <Text style={styles.newAccountText}>انشاء حساب جديد</Text>
                </Pressable>
            </ImageBackground>
        )
    }

}