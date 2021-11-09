import React,{ Component } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { colors, images } from '../../config';
import styles from './styles';
import { Icon } from "../../components";
import ConfirmModal from './ConfirmModal';

export default class HowWillGo extends Component{

    constructor(props){
        super(props)
        this.state={
            index:0,
            visible:false
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Pressable onPress={()=>this.props.navigation.navigate('Home')}>
                    <Text style={styles.hello1}> تجاهل</Text>
                </Pressable>
                <Image style={styles.img} source={images.back_home}/>
                <Text style={styles.hello}> مرحبا بك في ساير</Text>
                <Text style={styles.address}> قم باختيار خطوتك التالية</Text>

                <Pressable onPress={()=> this.setState({index:0})} style={this.state.index == 0 ? styles.itemViewActive:styles.itemView}>
                    <Icon name={'tasks'} type={'font-awesome'} size={18} color={'#101CB1'}/>
                    <Text style={styles.address}>  استعراض الخطة   </Text>
                    {this.state.index == 0 &&<Icon name={'check'}  type={'AntDesign'} color={colors.primary} />}
                </Pressable>

                <Pressable onPress={()=> this.setState({index:1})} style={this.state.index == 1 ? styles.itemViewActive:styles.itemView}>
                    <Icon name={'edit'} type={'feather'} size={18} color={'#A110B1'}/>
                    <Text style={styles.address}>   تعديل الخطة   </Text>
                    {this.state.index == 1 &&<Icon name={'check'}  type={'AntDesign'} color={colors.primary} />}
                    </Pressable>

                <Pressable onPress={()=> this.setState({index:2})} style={this.state.index == 2 ? styles.itemViewActive:styles.itemView}>
                    <Icon name={'hand-o-up'} type={'font-awesome'} size={18} color={'#D8702B'}/>
                    <Text style={styles.address}>  ادخال الخطة   </Text>
                    {this.state.index == 2 &&<Icon name={'check'}  type={'AntDesign'} color={colors.primary} />}
                    </Pressable>

                    <Pressable onPress={() => this.setState({visible:true})} style={styles.btn}>
                        <Text style={styles.loginBtn}> اختيار</Text>
                    </Pressable> 

                    <ConfirmModal visible={this.state.visible} onRequestClose={() => this.setState({visible:false})}/>
           </View>
        )
    }

}