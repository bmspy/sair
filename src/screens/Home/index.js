import React,{ Component } from 'react';
import { View, Text, Image, TextInput, FlatList, ScrollView, Pressable } from 'react-native';
import { colors, images } from '../../config';
import styles from './styles';
import { Icon } from '../../components';
import SelectDropdown from 'react-native-select-dropdown'
import ConfirmModal from './ConfirmModal';
import ChooseLocation from './ChooseLocation';


const countries = ["Egypt", "Canada", "Australia", "Ireland"]
export default class Home extends Component{

    constructor(props){
        super(props)
        this.state={
            index:0,
            type:'supervisor',
            LoctionVisible:false,
            visible:false
        }
    }

    render(){
        if(this.state.type == 'supervisor'){
            return(
                <View>
                    <View style={styles.superVisorHeader}>
                        <View style={styles.superVisorHeader1}>
                            <View style={styles.sideHeader}>
                                <Pressable style={styles.plusView} onPress={() => this.props.navigation.openDrawer()}>
                                    <Image source={images.menuBar1} style={{tintColor:colors.black}}/>
                                </Pressable>
                                <View>
                                    <Text style={[styles.address,{color:colors.white}]}>مرحبا محمد العبري</Text>
                                    {/* <Text style={styles.date}> تشرين الأول 2021 5</Text> */}
                                </View>
                            </View>
                            <View style={[styles.superVisorHeader2,{width:100,justifyContent:'space-between'}]}>
                                <Pressable>
                                    <Icon name={'bell'} type={'font-awesome'} color={colors.white} size={20}/>
                                </Pressable>
                                <Pressable onPress={() => this.props.navigation.navigate('Profile')}>
                                    <Image style={styles.avatar} source={images.avatar}/> 
                                </Pressable> 
                            </View>
                        </View>
                        <Pressable onPress={() => this.setState({LoctionVisible:true})} style={styles.superVisorHeader2}>
                            <Pressable onPress={() => this.setState({LoctionVisible:true})} style={styles.plusView}>
                                <Icon name={'plus'} type={'AntDesign'} color={colors.primary} size={20}/>
                            </Pressable>
                            <Text style={[styles.address,{color:colors.white}]}>ادخال خطة جديدة</Text>
                        </Pressable>
                           
                    </View>

                    <View style={[styles.superVisorHeader1,{backgroundColor:'transparent'}]}>
                        <View style={styles.sideHeader}>
                            <Pressable style={styles.plusView1} onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name={'file-pdf'} type={'material-community'} color={colors.white} size={20}/>
                            </Pressable>
                            <View>
                                <Text style={[styles.address,{color:colors.primary}]}>خطتك لهذا الشهر</Text>
                            </View>
                        </View>
                        <View style={styles.superVisorHeader3}>
                        <SelectDropdown
                            data={countries}
                            defaultButtonText={'أكتوبر 2021'}
                            buttonStyle={{width:140,backgroundColor:colors.borderGrey,borderRadius:8,height:40}}
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
                    </View>       

                    <FlatList data={[{},{},{},{}]}
                        renderItem={()=>{
                            return <Pressable onPress={() => this.props.navigation.navigate('PlaneDetails')} 
                                              style={styles.consultantView1}>
                                    <View style={styles.sideHeader}>
                                        <Pressable style={styles.rightSide}  onPress={() => this.props.navigation.openDrawer()}>
                                            <Icon name={'calendar-o'} type={'font-awesome'} reverseColor={'#79AF77'} reverse color={'rgba(16,148,12,0.2)'} size={20}/>
                                            <Text style={styles.address}>الاحد</Text>
                                            <Image source={images.dashes}/>
                                        </Pressable>
                                    </View>
                                    <View>
                                        <View style={styles.leftside}>
                                            <View>
                                                <Text style={styles.address}>أكتوبر 5 , 2021</Text>
                                            </View>
                                            <Pressable onPress={() => this.setState({visible:true})}>
                                                <Icon name={'dots-three-horizontal'} type={'entypo'}/>
                                            </Pressable>
                                        </View>
                                        <View style={styles.itemSchooleconatianer}>
                                            <View style={styles.leftside}>
                                                <View>
                                                    <Text style={styles.address}>مدرسة السنينة</Text>
                                                </View>
                                                <View style={styles.leftside}>
                                                    <Icon name={'car-alt'} type={'font-awesome5'} reverse size={12} reverseColor={colors.primary} color={'rgba(16,177,177,0.2)'}/>
                                                    <Pressable onPress={()=> {}}>
                                                        <Icon name={'location-pin'} type={'entypo'} reverse size={12}  reverseColor={colors.primary} color={'rgba(16,177,177,0.2)'}/>
                                                    </Pressable>
                                                </View>
                                            </View>

                                            <View style={styles.leftside}>
                                                <View style={styles.leftside}>
                                                    <Icon name={'check'} type={'entypo'} size={12} reverse reverseColor={colors.primary} color={colors.white}/>
                                                    <Text style={[styles.hello,{color:colors.primary,fontSize:13}]}>  تم التنفيذ </Text>
                                                </View>
                                                <View style={styles.leftside}>
                                                    <Icon name={'reload1'} type={'AntDesign'} size={12} reverse reverseColor={colors.primary} color={colors.white}/>
                                                    <Text style={[styles.hello,{fontSize:13}]}>  ذكرني  </Text>
                                                </View>
                                            </View>
                                            
                                        </View> 
                                    </View>
                                    
                            </Pressable>
                        }}
                    />       
                     <ConfirmModal visible={this.state.visible}
                      onRequestClose={() => {
                         this.setState({visible:false})
                     }}
                      onAddNote={() => {
                        this.props.navigation.navigate('AddNote')
                        this.setState({visible:false})
                      }}
                     />      
                     <ChooseLocation visible={this.state.LoctionVisible} onRequestClose={() => {
                         this.setState({LoctionVisible:false})
                         this.props.navigation.navigate('ChooseSchool')
                     }} />
                </View>
            )
        }else{
            return(
                <ScrollView>
                    <View style={styles.header}>
                        <View style={styles.sideHeader}>
                            <Pressable onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={images.menuBar}/>
                            </Pressable>
                            
                            <View>
                                <Text style={styles.address}>الرئيسية</Text>
                                <Text style={styles.date}> تشرين الأول 2021 5</Text>
                            </View>
                        </View>
                        <Pressable onPress={() => this.props.navigation.navigate('Profile')}>
                          <Image style={styles.avatar} source={images.avatar}/>  
                        </Pressable>
                        
                    </View>
    
                    <View style={styles.searchView}>
                        <Icon type={'FontAwesome5'} name={'search'} size={20} color={colors.dimGray}/>
                        <TextInput placeholder={'بحث عن الاقسام'} style={styles.input} />
                    </View>
    
                    <View style={styles.type}>
                        <View style={styles.name}>
                            <Text style={this.state.index == 0 ? styles.activeText : styles.address}>{'أنثى'}</Text>
                            {this.state.index == 0 && <View style={styles.circle}/>}
                        </View>
    
                        <View style={styles.name}>
                            <Text style={this.state.index == 1 ? styles.activeText : styles.address}>{'ذكر'}</Text>
                            {this.state.index == 1 && <View style={styles.circle}/>}
                        </View>
    
                        <View style={styles.name}>
                            <Text style={this.state.index == 2 ? styles.activeText : styles.address}>{'الجميع'}</Text>
                            {this.state.index == 2 && <View style={styles.circle}/>}
                        </View>
                    </View>
                   
                    <View style={styles.type}>
                        {[{name:'يناير'},{name:'فبراير'},{name:'مارس'},{name:'تشرين الأول'}].map((item,index)=>{
                            return <View style={this.state.index == index ? styles.monthView:styles.nonActiveMonthView}>
                            <Text style={this.state.index == index ? styles.monthText : styles.nonActiveMonthText}>{item.name}</Text>
                        </View>
                        })
                        }
                    </View>
    
                    <FlatList data={[{},{},{},{}]}
                        renderItem={()=>{
                            return <Pressable onPress={() => this.props.navigation.navigate('PlaneDetails')} style={styles.consultantView}>
                                     <View style={styles.sideHeader}>
                                        <Image source={images.menuBar} style={styles.itemImage}/>
                                        <View>
                                            <Text style={styles.address}>محمد محمد</Text>
                                            <Text style={styles.date}>مشرف رياضيات</Text>
                                        </View>
                                    </View>
                                    <View>
                                    <Text style={styles.date}> 3 ساعات</Text>
                                    <Pressable style={styles.palneView}>
                                        <Text style={styles.monthText1}>عرض الخطة الشهرية</Text>
                                    </Pressable>
                                    </View>
                            </Pressable>
                        }}
                    />
                </ScrollView>
            )
        }
        
    }

}