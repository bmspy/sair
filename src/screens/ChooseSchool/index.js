import React,{ Component } from 'react';
import { View, Text, ScrollView,Pressable, Image, FlatList } from 'react-native';
import { Icon } from '../../components';
import { images } from '../../config';
import styles from './styles';

export default class ChooseSchool extends Component{

    constructor(props){
        super(props)
        this.state={
            index: 1,
        }
    }

    render(){
        return(
                <View>
                    <View style={styles.header}>
                        <View style={styles.sideHeader}>
                            <Pressable onPress={() => this.props.navigation.pop()}>
                                <Icon type={'material'} size={30} name={'keyboard-arrow-right'}/>
                            </Pressable>
                            
                            <View>
                                <Text style={styles.address}>اختيار اسم المدرسة</Text>
                            </View>
                            <Pressable onPress={() => this.props.navigation.openDrawer()}>
                                {/* <Icon type={'material'} size={30} name={'keyboard-arrow-right'}/> */}
                            </Pressable>
                        </View>
                    </View>
                    <Image style={styles.img} source={images.choose_school}/>
                    <FlatList data={[{id:0},{id:1},{id:2}]}
                              keyExtractor={item=>'Schools: '+item.id}
                              renderItem={(item) => {
                                  return(
                                      <View style={styles.view}>
                                          <Text style={this.state.index != item.index ? styles.hello:styles.address}>مدرسة الطلائع</Text>
                                      </View>
                                  )
                              }}/>
                    <Pressable onPress={()=> this.props.navigation.navigate('AddPlane')} style={styles.btn}>
                        <Text style={styles.loginBtn}>  اختيار   </Text>
                    </Pressable>
                </View>
        )
    }

}