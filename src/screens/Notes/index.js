import React from 'react';
import { View, Text, Pressable, ScrollView, Image, FlatList } from 'react-native';
import { Icon } from '../../components';
import { colors, images } from '../../config';
import styles from './styles'

export default class Notes extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <ScrollView>
                    <View style={styles.header}>
                        <View style={styles.sideHeader}>
                            <Pressable onPress={() => this.props.navigation.pop()}>
                                <Icon type={'material'} size={30} name={'keyboard-arrow-right'}/>
                            </Pressable>
                            
                            <View>
                                <Text style={styles.address}>ملاحظاتي</Text>
                            </View>
                            <Pressable style={styles.plusView}>
                            <Icon name={'plus'} type={'AntDesign'} color={colors.white} size={20}/>                          
                        </Pressable>
                        </View>
                    </View>
                    <FlatList data={[{},{},{},{},{},{},{},{},{},{},{},{}]}
                    numColumns={2}
                    style={{alignSelf:'center'}}
                        renderItem={(item)=>{
                            return <Pressable onPress={() => this.props.navigation.navigate('PlaneDetails')}
                                              style={[styles.consultantView,{backgroundColor:item.index == 0 ?'#E4F6E3':item.index == 1?'#F9EEEB':colors.white}]}>
                                                  <Text style={[styles.new,{
                                                      backgroundColor:item.index == 0 ?'#E4F6E3':item.index == 1?'#F9EEEB':colors.white,
                                                    //   color:item.index == 0 ?'#E4F6E3':item.index == 1?'#F9EEEB':colors.white
                                                  }]}>جديد</Text>
                                        <Text style={styles.address}>أكتوبر 5 , 2021</Text>
                                        <Text style={styles.date}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.</Text>
                                    </Pressable>
                        }}
                    />
            </ScrollView>        
        )
    }

}