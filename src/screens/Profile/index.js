import React,{ Component } from 'react';
import { View, Text, Image, TextInput, FlatList, ScrollView, Pressable, ImageBackground } from 'react-native';
import { colors, images } from '../../config';
import styles from './styles';
import { Icon } from '../../components';


export default class Profile extends Component{

    constructor(props){
        super(props)
        this.state={
            index:0,
            edit:false
        }
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.sideHeader}>
                    <Pressable onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={images.menuBar}/>
                        </Pressable>
                        <View>
                            <Text style={styles.address}>طلبات المشرفين</Text>
                            <Text style={styles.date}> تشرين الأول 2021 5</Text>
                        </View>
                    </View>
                    <Pressable onPress={() => this.props.navigation.navigate('Profile')}>
                      <Image style={styles.avatar} source={images.avatar}/>  
                    </Pressable>
                    
                </View>
                <View style={styles.header}>
                    <View/>                    
                    <ImageBackground style={styles.imgContainer} imageStyle={styles.img} source={images.avatar}>
                        {this.state.edir &&<Icon name={'camera'} type={'feather'}/>}
                    </ImageBackground>
                    <Pressable onPress={()=>this.setState({edit:true})}>
                        <Icon name={'edit'} type={'feather'}/>
                    </Pressable>
                </View>
                {!this.state.edit &&
                <View style={styles.container}>

                    <Text style={styles.address4}>البريد الالكتروني</Text>
                    <Text style={styles.address3}>patrick.cunningham@mail.com</Text>


                    <Text style={styles.address4}>الرقم المدني</Text>
                    <Text style={styles.address3}>p378862</Text>


                    <Text style={styles.address4}>الرقم الوظيفي</Text>
                    <Text style={styles.address3}>8736735</Text>


                    <Text style={styles.address4}>رقم الهاتف</Text>
                    <Text style={styles.address3}>(993)519-1203</Text>

                    <Text style={styles.address4}>الاسم رباعي</Text>
                    <Text style={styles.address3}>احمد محمد يوسف مدوج</Text>
{/* 

                    <Pressable onPress={()=>this.props.navigation.navigate('SignIn')} style={styles.btn}>
                        <Text style={styles.loginBtn}> ارسال</Text>
                    </Pressable> */}

                </View>
                }
            {this.state.edit &&
                <View >

                    <Text style={styles.address4}>البريد الالكتروني</Text>
                    <TextInput placeholder={'test@test.com'} placeholderTextColor={colors.borderGrey} style={styles.input} />


                    <Text style={styles.address4}>الرقم المدني</Text>
                    <TextInput placeholder={'23456'} placeholderTextColor={colors.borderGrey} style={styles.input} />


                    <Text style={styles.address4}>الرقم الوظيفي</Text>
                    <TextInput placeholder={'34567'} placeholderTextColor={colors.borderGrey} style={styles.input} />


                    <Text style={styles.address4}>رقم الهاتف</Text>
                    <TextInput placeholder={'8762345678'} placeholderTextColor={colors.borderGrey} style={styles.input} />

                    <Text style={styles.address4}>الاسم رباعي</Text>
                    <TextInput placeholder={'Fatma Alrubaie'} placeholderTextColor={colors.borderGrey} style={styles.input} />


                    <Pressable onPress={()=>this.props.navigation.navigate('SignIn')} style={styles.btn}>
                        <Text style={styles.loginBtn}> ارسال</Text>
                    </Pressable>

                </View>
}
                

            </ScrollView>
        )
    }

}