import React,{ Component } from 'react';
import { View, Text, FlatList, Pressable, ScrollView } from 'react-native';
import { Icon } from '../../components';
import { colors } from '../../config';
import styles from './styles';
import CommitPlane from "./CommitPlane";

export default class PlaneDetails extends Component{

    constructor(props){
        super(props)
        this.state={
            CommitPlane:false
        }
    }

    render(){
        return(
          <View style={styles.cont}>
            <View style={styles.content}>
                <View style={styles.container}>
                    <View style={styles.sideHeader}>
                        <Pressable onPress={()=>this.props.navigation.pop()}>
                            <Icon type={'material'} name={'keyboard-arrow-right'} color={colors.dimGray}/>
                        </Pressable>
                        <Text style={styles.address}>تفاصيل الخطة</Text>
                    </View>
                    <View style={styles.dateView}>
                        <View style={styles.sideHeader1}>
                            <Text style={styles.address2}> الشهر</Text>
                            <Text style={styles.address1}>اكتوبر</Text>
                        </View>

                        <View style={styles.sideHeader1}>
                            <Text style={styles.address2}>المدة</Text>
                            <Text style={styles.address1}>20 يوم</Text>
                        </View>
                    </View>

                    <View style={styles.dateView1}>
                        <Text style={styles.address1}>التاريخ</Text>
                        <Text style={styles.address1}>المدرسة</Text>
                        <Text style={styles.address1}>طريقة الذهاب</Text>
                    </View>

                    <FlatList data={[{},{},{},{},{}]}
                              keyExtractor={item => 'item' + item.id}
                              ListFooterComponent={() => {return <View style={styles.seperator}/>}}
                              renderItem={(item) => {
                                  return (
                                       <View style={styles.dateView2}>
                                        <Text style={styles.address3}>التاريخ</Text>
                                        <Text style={styles.address3}>المدرسة</Text>
                                        <Text style={styles.address3}>طريقة الذهاب</Text>
                                      </View>
                              ) }}
                    />

                    <Text style={styles.address4}>التفاصيل</Text>
                    <Text style={styles.address3}>هذه الخطة الشهرية للمشرف في انتظار اعتماد مدير الدائرة.</Text>

                    {true?<Pressable onPress={()=>this.setState({CommitPlane:true})} style={styles.btn}>
                        <Text style={styles.loginBtn}> اعتماد مدير الدائرة</Text>
                    </Pressable>
                    :
                    <Pressable onPress={()=>this.props.navigation.navigate('SignIn')} style={styles.btn}>
                        <Text style={styles.loginBtn}> ارسال</Text>
                    </Pressable>}
                </View>
                <View style={styles.dateView}>
                    <View style={styles.sideHeader2}>
                        <Icon type={'font-awesome'} name={'file-pdf-o'} color={colors.primary}/>
                        <Text style={styles.address2}> pdf تصدير</Text>
                    </View>

                    <View style={styles.sideHeader2}>
                        <Icon type={'FontAwesome5'} name={'share-alt'} color={colors.primary}/>
                        <Text style={styles.address2}>مشاركة</Text>
                    </View>
                </View>
            </View>
            <CommitPlane visible={this.state.CommitPlane} onRequestClose={() => {
                         this.setState({CommitPlane:false})
                        //  this.props.navigation.navigate('ChooseSchool')
                     }} />
          </View>  
        )
    }

}