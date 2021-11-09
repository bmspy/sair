import React from 'react';
import { View, Text, Image, Pressable } from "react-native";
import { images } from '../../config';
import styles from './styles';

export default class CustomDrawerContent extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props)
        return(
            <View style={styles.container}>
                <Image style={styles.img} source={images.avatar}/>
                <Text style={styles.address}>احمد عبد السلام</Text>
                <Pressable onPress={() => this.props.navigation.navigate('HowWillGo')} style={styles.itemView}>
                    <View style={styles.dot}/>
                    <Text style={styles.address1}>الرئيسية</Text>
                </Pressable>

                <View style={styles.itemView}>
                    <View style={styles.dot}/>
                    <Text style={styles.address1}>تقارير</Text>
                </View>

                <Pressable onPress={()=>this.props.navigation.navigate('Notes')}
                            style={styles.itemView}>
                    <View style={styles.dot}/>
                    <Text style={styles.address1}>ملاحظاتي</Text>
                </Pressable>

                <Pressable onPress={()=>this.props.navigation.navigate('Request')}
                            style={styles.itemView}>
                    <View style={styles.dot}/>
                    <Text style={styles.address1}>طلبات المشرفين</Text>
                </Pressable>

                <Pressable onPress={()=>this.props.navigation.navigate('Profile')}
                            style={styles.itemView}>
                    <View style={styles.dot}/>
                    <Text style={styles.address1}>تعديل الملف الشخصي</Text>
                </Pressable>

                <Pressable  onPress={()=>this.props.navigation.navigate('ChangePassword')}
                 style={styles.itemView}>
                    <View style={styles.dot}/>
                    <Text style={styles.address1}>تغيير كلمة المرور</Text>
                </Pressable>

                <Pressable onPress={()=> this.props.navigation.navigate('PrivacyPolicy')} style={styles.itemView}>
                    <View style={styles.dot}/>
                    <Text style={styles.address1}>سياسة الخصوصية</Text>
                </Pressable>

                <Pressable onPress={()=> this.props.navigation.navigate('About')} style={styles.itemView}>
                    <View style={styles.dot}/>
                    <Text style={styles.address1}>عن التطبيق</Text>
                </Pressable>

                <Pressable onPress={()=>this.props.navigation.navigate('SignIn')} style={styles.btn}>
                    <Text style={styles.loginBtn}> تسجيل الخروج</Text>
                </Pressable>
            </View>
        )
    }

}