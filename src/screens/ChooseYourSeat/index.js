import React,{ Component } from 'react';
import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import { Icon }  from '../../components';
import { colors, images } from '../../config';
import CompleteSeats from './CompleteSeats';
import styles from './styles';

export default class ChooseYourSeat extends Component{

    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }

    render(){
        return(
            <ScrollView>
            <View style={styles.sideHeader}>
                <Pressable onPress={()=>this.props.navigation.pop()}>
                    <Icon type={'material'} size={30} name={'keyboard-arrow-right'} color={colors.black}/>
                </Pressable>
                <Text style={styles.address}> اختر مقعدك  </Text>
                <Text></Text>
            </View>
            <Image style={styles.content} source={images.car_img}/>
            <View style={styles.driverView}>
                <View style={styles.driver}>
                    <Image style={styles.img} source={images.avatar}/>
                    <Text style={styles.address}> فاطمة الرباعي  </Text>
                </View>
                <Pressable onPress={()=>this.props.onRequestCChoose('سائق')} style={styles.driver_btn}>
                    <Text style={styles.driver_txt}>سائق</Text>
                </Pressable>
            </View>
            <View style={styles.dateView}>
                <Text style={styles.date}>الأربعاء 7 أكتوبر , 2021</Text>
                <Text style={styles.school}>مدرسة: وادي الحيول</Text>
            </View>
            <View style={[styles.dateView,{width:'60%'}]}>
                <Pressable onPress={()=>this.setState({visible:true})} style={[styles.driver_btn,{width:100}]}>
                    <Text style={styles.driver_txt}>تأكيد التنفيذ'</Text>
                </Pressable>
                <Pressable onPress={()=>this.props.onRequestCChoose('الغاء')} style={[styles.driver_btn,{backgroundColor:colors.red,width:100}]}>
                    <Text style={styles.driver_txt}>الغاء</Text>
                </Pressable>
            </View>
            <CompleteSeats onRequestCChoose={(item) => {
                    this.setState({visible:false})
                    this.props.navigation.navigate('ChooseYourSeat')
                    }} visible={this.state.visible} onRequestClose={() => this.setState({visible:false})}/>
            </ScrollView>
        )
    }

}