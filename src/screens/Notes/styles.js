import { StyleSheet } from 'react-native';
import { colors } from '../../config';
import commonStyle from '../../styles/common.style';

export default StyleSheet.create({
    avatar:{
        width:33,
        height:33,
        borderRadius: 33 / 2
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'10%',
        paddingHorizontal:'5%'
    },
    superVisorHeader:{
        backgroundColor:colors.primary,
        // height:188,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        // flexDirection:'row',
        // justifyContent:'space-between',
        // alignItems:'center',
        paddingBottom:'2%',
        // paddingHorizontal:'5%'
    },
    superVisorHeader1:{
        backgroundColor:colors.primary,
        // height:188,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:'2%',
        paddingHorizontal:'5%',
        marginTop:'5%'
    },
    superVisorHeader2:{
        backgroundColor:colors.primary,
        // height:188,
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
        flexDirection:'row',
        // justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:'2%',
        paddingHorizontal:'5%',
        // marginTop:'5%'
    },
    superVisorHeader3:{
        flexDirection:'row',
        alignItems:'center',
    },
    sideHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%'
    },
    address:{
        ...commonStyle.BoldFont,
        fontSize:15,
        color:colors.black,
        textAlign:'left',
        marginBottom: 5,
        // marginHorizontal:'5%'
    },
    hello:{
        ...commonStyle.RegularFont,
        fontSize:12,
        color:colors.dimGray,
    },
    date:{
        ...commonStyle.LightFont,
        fontSize:13,
        color:colors.black,
        // height:85,
        textAlign:'left',
        fontWeight: 'normal',
        // resizeMode: 'contain',
        maxHeight:107,
    },
    searchView:{
        width:'90%',
        alignSelf:'center',
        backgroundColor:colors.white,
        height:49,
        marginTop:'5%',
        borderRadius:10,
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:'5%',
    },
    input:{
        ...commonStyle.RegularItalicFont,
        width:'100%'
    },
    circle:{
        width:6,
        height:6,
        borderRadius:6 /2,
        backgroundColor:colors.primary
    },
    activeText:{
        ...commonStyle.BoldFont,
        fontSize:17,
        color:colors.primary,
    },
    name:{
        alignItems:'center',

    },
    type:{
        flexDirection:'row',
        paddingHorizontal:'5%',
        marginTop:'5%'
    },
    monthView:{
        backgroundColor:colors.primary,
        width:44,
        height:57,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:'3%'
    },
    nonActiveMonthView:{
        backgroundColor:colors.white,
        width:44,
        height:57,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:'3%'
    },
    monthText:{
        ...commonStyle.RegularItalicFont,
        color:colors.white,
        fontSize:12,
        textAlign:'center'
    },
    monthText1:{
        ...commonStyle.RegularItalicFont,
        color:colors.white,
        fontSize:11,
        textAlign:'center'
    },
    nonActiveMonthText:{
        ...commonStyle.RegularItalicFont,
        color:colors.black,
        fontSize:12,
        textAlign:'center'
    },
    consultantView:{
        height:177,
        width:160,
        backgroundColor:colors.white,
        alignSelf:'center',
        margin:'3%',
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        // paddingHorizontal:'5%',
        paddingVertical:'3%',
        // flexDirection:'row',
        // alignItems:'center',
        // overflow: 'hidden',
        // justifyContent:'space-between'
    },
    consultantView1:{
        // height:88,
        width:'90%',
        backgroundColor:colors.white,
        alignSelf:'center',
        marginTop:'5%',
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingHorizontal:'5%',
        paddingVertical:'4%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    itemImage:{
        width:28,
        height:28,
        borderRadius:10,
        backgroundColor:colors.dimGray,
        marginHorizontal:'2%'
    },
    palneView:{
        width:115,
        height:28,
        borderRadius:10,
        backgroundColor:colors.primary,
        alignItems:'center',
        justifyContent:'center'
    },
    plusView:{
        width: 33,
        height: 33,
        backgroundColor: colors.primary,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 33 /2
    },
    plusView1:{
        width: 33,
        height: 33,
        backgroundColor: colors.primary,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 33 /2
    },
    leftside:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    rightSide:{
        alignItems:'center'
    },
    itemSchooleconatianer:{
       width: 260,
       height: 100.86 ,
       backgroundColor:'#F3F3F3',
       borderTopEndRadius: 15,
       borderBottomEndRadius: 15,
       borderBottomStartRadius: 15,
       padding:'5%'
    },
    modalContainer:{
        backgroundColor:'rgba(0,0,0,0.7)',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    modalConetnt:{
        padding:'3%',
        borderTopEndRadius:20,
        borderTopStartRadius:20,
        backgroundColor:colors.white,
        width:'100%',
        bottom:0,
        position:'absolute'
    },

    itemView:{
        width:'90%',
        // height:45,
        backgroundColor:colors.white,
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:20,
        paddingHorizontal:'5%',
        marginTop:'5%'
    },
    itemViewActive:{
        width:'90%',
        // height:45,
        backgroundColor:colors.white,
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:20,
        paddingHorizontal:'5%',
        marginTop:'5%',
        // borderWidth:1,
        // borderColor:colors.primary
    },
    new:{
        borderRadius:3,
        ...commonStyle.RegularItalicFont,
        fontSize:13,
        color:colors.black,
        alignSelf:'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        width:50,
        textAlign:'center',
        marginBottom:'2%',
        right: -3,
        top: 7,
        fontWeight: 'normal',
        position: 'absolute',
    }
})