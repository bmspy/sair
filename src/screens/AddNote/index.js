import React,{ Component } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import{Icon} from '../../components';
import { colors } from '../../config';
import styles from './styles';

export default class AddNote extends Component{

    constructor(props){
        super(props)
        this.state={
            value:'هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.'+
            ' إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.'+
'ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق. '
        }
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.sideHeader}>
                    <Pressable onPress={()=>this.props.navigation.pop()}>
                        <Icon type={'material'} size={30} name={'keyboard-arrow-right'} color={colors.black}/>
                    </Pressable>
                    <Text style={styles.address}> أكتوبر 5 , 2021 </Text>
                </View>
                <View style={styles.content}>
                    <TextInput style={styles.text} multiline numberOfLines={17} value={this.state.value}/>
                    <View style={styles.footer}>
                        <Icon type={'font-awesome'} size={20} name={'microphone'} color={colors.white}/>
                        <Icon type={'entypo'} size={25} name={'images'} color={colors.white}/>
                        <Icon type={'material'} size={30} name={'check'} color={colors.white}/>
                    </View>
                </View>
            </ScrollView>
        )
    }

}