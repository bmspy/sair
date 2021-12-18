import React,{ Component } from 'react';
import { View, Text, Image, TextInput, FlatList, ScrollView, Pressable } from 'react-native';
import { colors, images } from '../../config';
import styles from './styles';
import { Icon } from '../../components';


export default class Request extends Component{

    constructor(props){
        super(props)
        this.state={
            index:0
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
               
                <FlatList data={[{id:0},{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},]}
                          keyExtractor={item => 'Request: '+item.id}
                        renderItem={()=>{
                            return <View style={styles.consultantView}>
                                <Pressable onPress={() => this.props.navigation.navigate('PlaneDetails')} 
                                style={styles.consultantView1}>
                                    <View style={styles.sideHeader}>
                                        <Image source={images.menuBar} style={styles.itemImage}/>
                                        <View>
                                            <Text style={styles.address}>محمد محمد</Text>
                                            <Text style={styles.date}>مشرف رياضيات</Text>
                                        </View>
                                    </View>
                                    <View>
                                    <Text style={styles.date}> 3 ساعات</Text>
                                    
                                    </View>
                                    </Pressable>
                                    <View style={styles.view}>
                                        <Pressable style={styles.palneView}>
                                            <Text style={styles.monthText1}>رفض </Text>
                                        </Pressable>
                                        <Pressable style={styles.palneView1}>
                                            <Text style={styles.monthText2}>قبول</Text>
                                        </Pressable>
                                    </View>
                            
                            </View>
                        }}
                />

            </ScrollView>
        )
    }

}