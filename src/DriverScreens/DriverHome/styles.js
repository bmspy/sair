import { StyleSheet } from 'react-native';
import { colors } from '../../config';
import commonStyle from '../../styles/common.style';

export default StyleSheet.create({
    avatar:{
        width:33,
        height:33,
        borderRadius: 33 / 2
    },
    img:{
        width:90,
        height:90,
        borderRadius:90/2,
        alignSelf:'center',
        // borderColor:colors.primary,
        // borderWidth:2,
        // marginTop:'5%',
        // alignItems:'center',
        // justifyContent:'center',
        // backgroundColor:'red',
        margin:'3%',
    },
    imgContainer:{
        width:100,
        height:100,
        borderRadius:100/2,
        alignSelf:'center',
        borderColor:colors.primary,
        borderWidth:2,
        marginTop:'5%',
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        // padding:5
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'10%',
        paddingHorizontal:'5%'
    },
    sideHeader:{
        flexDirection:'row',
        alignItems:'center'
    },
    address:{
        ...commonStyle.BoldFont,
        fontSize:17,
        color:colors.black,
        marginHorizontal:'5%'
    },
    date:{
        ...commonStyle.RegularFont,
        fontSize:14,
        color:colors.black
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
    monthText2:{
        ...commonStyle.RegularItalicFont,
        color:colors.primary,
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
        height:105,
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
        // paddingHorizontal:'5%',
        paddingVertical:'2%',
        // flexDirection:'row',
        alignItems:'center',
        // justifyContent:'space-between'
    },
    consultantView1:{
        alignSelf:'center',
        paddingHorizontal:'5%',
        backgroundColor:colors.white,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'90%'
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
    palneView:{
        width:115,
        height:28,
        borderRadius:10,
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderColor:colors.primary
    },
    container:{
        borderRadius:20,
        backgroundColor:colors.white,
        width:'90%',
        alignSelf:'center',
        paddingVertical:'5%',
        marginTop:'5%'
    },
    address3:{
        ...commonStyle.BoldFont,
        fontSize:14,
        color:colors.dimGray,
        marginHorizontal:'5%',
        textAlign:'left',
        marginTop:'1%',
    },
    address4:{
        ...commonStyle.BoldFont,
        fontSize:17,
        color:colors.black,
        marginHorizontal:'5%',
        marginTop:'3%',
        textAlign:'left',
    },
    btn:{
        backgroundColor:colors.primary,
        width: '90%',
        height:37,
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
})