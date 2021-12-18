import { Dimensions, Platform, StyleSheet } from "react-native";
import { colors } from "../../config";
import commonStyle from "../../styles/common.style";

export default StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        // alignItems:'center',
        // justifyContent:'center',
        // paddingTop:'10%'
    },
    content:{
        width:'100%',
        height:'100%',  
    },
    containerImge:{
        width:'100%',
        height:'100%', 
    },
    address:{
        ...commonStyle.BlackFont,
        color:colors.black,
        fontSize:22,
        textAlign:'center',
        marginTop:Platform.OS=='ios'?'12%':'5%'
    },
    hello:{
        width:'90%',
        ...commonStyle.BoldFont,
        color:colors.black,
        fontSize:20,
        marginVertical:'5%',
        textAlign:'left',
        alignSelf:'center'
    },
    hello1:{
        width:'90%',
        ...commonStyle.BoldFont,
        color:colors.primary,
        fontSize:15,
        marginVertical:'5%',
        textAlign:'center',
        alignSelf:'center'
    },
    label:{
        width:'90%',
        ...commonStyle.BoldFont,
        color:colors.black,
        fontSize:15,
        marginTop:'3%',
        textAlign:'left',
        alignSelf:'center'  
    },
    input:{
        ...commonStyle.RegularFont,
        color:colors.black,
        width:'90%',
        alignSelf:'center',
        borderBottomColor:colors.greyOpacity(0.9),
        borderBottomWidth:2,
        textAlign:'right',
        height:40
    },
    btnStyle:{
        width:'99%',
        backgroundColor:colors.white,
        borderRadius:20,
    },
    btnTxtStyle:{
        ...commonStyle.RegularFont,
        textAlign:'left'
    },
    selectDropdownStyle:{
        // backgroundColor:'red',
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:colors.primary,
        borderRadius:20,
        marginTop:'5%',
    },
    btn:{
        backgroundColor:colors.primary,
        width:309,
        height:47,
        alignSelf:'center',
        marginHorizontal:'10%',
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        marginTop:'10%'
    },
    loginBtn:{
        ...commonStyle.BoldFont,
        color:colors.white,
    },
    forgetText:{
        width:'90%',
        ...commonStyle.RegularFont,
        color:colors.primary,
        fontSize:16,
        marginTop:'5%' ,
        textAlign:'center',   
        alignSelf:'center'
    },
    newAccount:{
        width:'90%',
        marginTop:Platform.OS=='ios'?'20%':'10%' ,
        // bottom:0,
        alignSelf:'center'
        // position:'absolute'
    },
    newAccountText:{
        ...commonStyle.RegularFont,
        color:colors.primary,
        fontSize:16,
        textAlign:'center',
    },
    img:{
        alignSelf:'center',
        width:112,
        height:112,
        marginTop:'5%'
    },
    add_photo:{
        ...commonStyle.BoldItalicFont,
        fontSize:15,
        color:colors.primary
    },
    sectionItemStyle:{
        width:Dimensions.get('screen').width*0.3,
        height:75,
        alignItems:'center',
        justifyContent:'center'
    }
})