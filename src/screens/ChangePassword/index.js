import React,{ Component } from 'react';
import { View, Text, ImageBackground,Image, TextInput, Pressable, ScrollView, FlatList, Platform } from 'react-native';
import { colors, images } from '../../config';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown'
import { Icon } from '../../components';

const countries = ["Egypt", "Canada", "Australia", "Ireland"]
export default class ChangePassword extends Component{

    constructor(props){
        super(props)
        this.state={
            next:false
        }
    }

    render(){
        return(
            <ImageBackground source={images.signup} 
                             style={styles.container} 
                             imageStyle={styles.containerImge}>
               <ScrollView style={styles.content} >                        
                    {/* <Text style={styles.address}>تسجيل</Text> */}
                    <View style={styles.sideHeader}>
                        <Pressable onPress={()=>this.props.navigation.pop()}>
                                <Icon type={'material'} size={30} name={'keyboard-arrow-right'} color={colors.black}/>
                        </Pressable>
                        <Text style={styles.address}> أنشئ كلمة مرور جديدة </Text>
                    </View>
                    <Text style={styles.hello}>يجب أن تكون كلمة مرورك الجديدة مختلفة عن كلمات المرور السابقة المستخدمة</Text>

                    <Text style={styles.label}>كلمة المرور القديمة</Text>
                    <TextInput placeholder={'******'} placeholderTextColor={colors.borderGrey} style={styles.input} secureTextEntry/>

                    <Text style={styles.label}>كلمة المرور الجديدة</Text>
                    <TextInput placeholder={'******'} placeholderTextColor={colors.borderGrey} style={styles.input} secureTextEntry/>

                    <Text style={styles.label}>تاكيد كلمة المرور الجديدة</Text>
                    <TextInput placeholder={'******'} placeholderTextColor={colors.borderGrey} style={styles.input} secureTextEntry/>

                    <Pressable onPress={()=>{}} style={styles.btn}>
                        <Text style={styles.loginBtn}>حفظ</Text>
                    </Pressable>
                   

             </ScrollView> 
            </ImageBackground>
        )
    }

}