import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../config';
import commonStyle from '../../styles/common.style';

export default StyleSheet.create({
    address:{
        ...commonStyle.BlackFont,
        color:colors.black,
        fontSize:18,
        textAlignVertical:'center',
        // marginTop:Platform.OS=='ios'?'12%':'8%',
        width:'90%',
        alignSelf:'center',
        textAlign: 'left',
        // height:60,
        
    },
    // address1:{
    //     ...commonStyle.BlackFont,
    //     color:colors.black,
    //     fontSize:18,
    //     textAlignVertical:'center',
    //     // marginTop:Platform.OS=='ios'?'12%':'8%',
    //     width:'90%',
    //     alignSelf:'center',
    //     height:60,
        
    // },
    sideHeader:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:'5%',
        height:60,
        justifyContent:'space-between',
        // backgroundColor:'red'
    },
    btn:{
        backgroundColor:colors.primary,
        width:'40%',
        height:47,
        alignSelf:'center',
        // marginHorizontal:'10%',
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5%'
    },
    loginBtn:{
        ...commonStyle.BoldFont,
        color:colors.white,
    },
    location_view:{
        width:48,
        height:48,
        borderRadius: 48 / 2,
        backgroundColor:'#9FD49DA9',
        alignItems:'center',
        justifyContent:'center'
    },
    item_location:{
        marginHorizontal:5,
        alignItems:'center',
        justifyContent:'center'
    },
    location_text:{
        ...commonStyle.RegularFont,
        fontSize:12,
        color:colors.black
    },
    location_img:{
        width:30,
        height:24
    },
    hello:{
        ...commonStyle.RegularFont,
        fontSize:15,
        color:colors.dimGray,
        marginHorizontal:'5%',
        textAlign:'center',
        textAlignVertical:'center'
    },
    view:{
        alignSelf:'center',
        borderBottomColor:colors.borderGrey,
        borderBottomWidth:1,
        width:'100%',
        height:35,
        alignItems:'center',
        justifyContent:'center'
    },
    address1:{
        ...commonStyle.BoldFont,
        fontSize:15,
        color:colors.black,
        marginHorizontal:'5%',
        textAlign:'center',
        textAlignVertical:'center'
    },
    dateView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems:'center',
        width:'100%',
        height:40,
        borderWidth:1,
        borderColor:colors.primary,
        backgroundColor:colors.primary,
        paddingHorizontal:'5%'
    },
    modalContainer:{
        backgroundColor:'rgba(0,0,0,0.7)',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    modalConetnt1:{
        padding:'3%',
        borderRadius:20,
        backgroundColor:colors.white,
        width:'80%',
    },
    driver_btn:{
        borderWidth:1,
        height:35,
        borderRadius:18,
        width:100,
        borderColor:colors.primary,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.primary
    },
    driver_txt:{
        ...commonStyle.BoldFont,
        fontSize:14,
        color:colors.white
    },
    special_car:{
        borderWidth:1,
        height:35,
        borderRadius:18,
        width:100,
        borderColor:colors.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    special_car_txt:{
        ...commonStyle.BoldFont,
        fontSize:14,
        color:colors.primary
    },
    GoMethodView:{
        alignItems:'center',
        justifyContent:'space-between',
        width:'70%',
        alignSelf:'center',
        flexDirection:'row',
        marginVertical:'5%'
    }
})