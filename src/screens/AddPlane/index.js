import React,{ Component } from 'react';
import { View, Text, ScrollView, Pressable, Image, FlatList } from 'react-native';
import{Icon} from '../../components';
import { colors, images } from '../../config';
import GoMethod from './GoMethod';
import styles from './styles';

export default class AddPlane extends Component{

    constructor(props){
        super(props)
        this.state={
            value:'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.'+
            ' إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.'+
'ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق. ',
            index:2,
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
                    <Text style={styles.address}> إضافة خطة شهرية  </Text>
                    <Text></Text>
                </View>
                <Text style={styles.address}> تحديد المكان  </Text>
                <View style={styles.type}>
                    <FlatList data = {[{name:'يناير'},{name:'فبراير'},{name:'مارس'},{name:'تشرين الأول'}]}
                              horizontal
                              renderItem={(item)=><View style={styles.item_location}>
                                                    <View style={[styles.location_view,{backgroundColor:item.index == 0 ? '#92929263':'#9FD49DA9'}]}>
                                                        {item.index == 0 ? <Icon name={'plus'} type={'AntDesign'} color={colors.dimGray} size={20}/>
                                                        :<Image style={styles.location_img} source={images.avatar}/>}
                                                    </View>
                                                    <Text style={styles.location_text}>{item.item.name}</Text>
                                                  </View>}
                    />
                </View>
                <View style={styles.dateView}>
                <Text style={styles.loginBtn}>اختيار</Text>
                <Text style={styles.loginBtn}>مدارس البريمي</Text>
                </View>
                <FlatList data={[{id:0},{id:1},{id:2}]}
                              keyExtractor={item=>'Schools: '+item.id}
                              renderItem={(item) => {
                                  return(
                                      <View style={styles.view}>
                                          <Text style={this.state.index != item.index ? styles.hello:styles.address1}>مدرسة الطلائع</Text>
                                      </View>
                                  )
                              }}/>
                <Pressable onPress={()=> this.setState({visible:true})} style={styles.btn}>
                    <Text style={styles.loginBtn}>  التالي   </Text>
                </Pressable>
                <Pressable onPress={()=> this.props.navigation.navigate('AddPlane')} style={styles.btn}>
                    <Text style={styles.loginBtn}>  تأكيد الخطة وتسليمها   </Text>
                </Pressable>
                <GoMethod onRequestCChoose={(item) => {
                    this.setState({visible:false})
                    this.props.navigation.navigate('ChooseYourSeat')
                    }} visible={this.state.visible} onRequestClose={() => this.setState({visible:false})}/>
            </ScrollView>
        )
    }

}