import React,{ Component } from 'react';
import { View, Text, ImageBackground,Image, TextInput, Pressable, ScrollView, FlatList, Platform } from 'react-native';
import { colors, images } from '../../config';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown'

const countries = ["Egypt", "Canada", "Australia", "Ireland"]
export default class SignUp extends Component{

    constructor(props){
        super(props)
        this.state={
            next:false
        }
    }

    renderContent () {
        return<View>
                 <Text style={styles.address}>أكمل المتطلبات</Text>

            <Image style={styles.img} source={images.add_photo}/>

            <Text style={styles.hello1}> إضافة صورة الملف الشخصي </Text>

            <Text style={styles.label}> رقم الهاتف</Text>
            <TextInput placeholder={'(993)519-1203'} placeholderTextColor={colors.borderGrey} style={styles.input}/>

            <Text style={styles.label}>الاسم رباعي</Text>
            <TextInput placeholder={'احمد محمد يوسف مدوج'} placeholderTextColor={colors.borderGrey} style={styles.input}/>

            <Text style={styles.label}>الوظيفة</Text>
            <View style={styles.selectDropdownStyle}>
                <SelectDropdown
                    data={countries}
                    buttonStyle={styles.btnStyle}
                    buttonTextStyle={styles.btnTxtStyle}
                    defaultButtonText={'اختيار الوظيفة'}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
            </View>

            <Text style={styles.label}>القسم</Text>
            <FlatList data={[{},{},{},{},{},{}]}
                    numColumns={3}
                    keyExtractor={item =>'section'+item}
                    renderItem={(item) => {
                            return <View style={styles.sectionItemStyle}>
                                        <Image source={images.section}/>
                                        <Text>تربية اسلامية</Text>
                                </View>
                    }}
                    ListFooterComponent={()=>{return(
                        <View>
                            <Pressable onPress={()=>this.setState({next:true})} style={styles.btn}>
                                <Text style={styles.loginBtn}>تسجيل</Text>
                            </Pressable>

                            <Pressable  onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
                            <Text style={styles.forgetText}>البنود و الشروط</Text>         
                            </Pressable> 
                            <Pressable  style={styles.newAccount} onPress={()=>this.props.navigation.navigate('SignIn')}>
                            <Text style={styles.newAccountText}>تسجيل الدخول إلى حسابك</Text>
                            </Pressable>
                        </View>
                    )}}
            />
        </View>
    }

    render(){
        return(
            <ImageBackground source={images.signup} 
                             style={styles.container} 
                             imageStyle={styles.containerImge}>
               {!this.state.next && <ScrollView style={styles.content} >                        
                    <Text style={styles.address}>تسجيل</Text>

                    <Text style={styles.hello}> !انشئ حساب </Text>

                    <Text style={styles.label}>البريد الالكتروني</Text>
                    <TextInput placeholder={'patrick.cunningham@mail.com'} placeholderTextColor={colors.borderGrey} style={styles.input}/>
                    
                    <Text style={styles.label}>الرقم المدني</Text>
                    <TextInput placeholder={'378862'} placeholderTextColor={colors.borderGrey} style={styles.input}/>
                    
                    <Text style={styles.label}>الرقم الوظيفي</Text>
                    <TextInput placeholder={'378862'} placeholderTextColor={colors.borderGrey} style={styles.input}/>
                    
                    <Text style={styles.label}>كلمة المرور</Text>
                    <TextInput placeholder={'******'} placeholderTextColor={colors.borderGrey} style={styles.input} secureTextEntry/>

                    <Text style={styles.label}>تاكيد كلمة المرور</Text>
                    <TextInput placeholder={'******'} placeholderTextColor={colors.borderGrey} style={styles.input} secureTextEntry/>

                    <Pressable onPress={()=>this.setState({next:true})} style={styles.btn}>
                        <Text style={styles.loginBtn}>التالي</Text>
                    </Pressable>
                   
               <Pressable  onPress={()=>this.props.navigation.navigate('ForgetPassword')}>
                    <Text style={styles.forgetText}>البنود و الشروط</Text>         
               </Pressable> 
                <Pressable  style={styles.newAccount} onPress={()=>this.props.navigation.navigate('SignIn')}>
                    <Text style={styles.newAccountText}>تسجيل الدخول إلى حسابك</Text>
                </Pressable>

             </ScrollView> }
            
               {this.state.next && 
               Platform.OS=='ios'?
               <View style={styles.content} >
                {this.renderContent()}
             </View> 
             :
             this.state.next &&<ScrollView style={styles.content} >
                 {this.renderContent()}
             </ScrollView> 
             }
            
            </ImageBackground>
        )
    }

}