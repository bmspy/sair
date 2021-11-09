import { StyleSheet } from "react-native";
import { colors } from "../../config";
import commonStyle from "../../styles/common.style";

export default StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        width:'100%',
        height:'100%',
        paddingTop:'10%',
        paddingHorizontal:'10%'
    },
    img:{
        width:99.91,
        height:99.91,
        borderRadius:99.91/2
    },
    address:{
        ...commonStyle.BoldFont,
        fontSize:18,
        color:colors.white,
        marginHorizontal:'2%'
    },
    address1:{
        ...commonStyle.RegularFont,
        fontSize:18,
        color:colors.white,
        marginHorizontal:'2%'
    },
    itemView:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:'10%'
    },
    dot:{
        width:8,
        height:8,
        borderRadius:8/2,
        backgroundColor:colors.white,
    },
    btn:{
        backgroundColor:colors.white,
        width:209,
        height:47,
        alignSelf:'flex-end',
        marginHorizontal:'10%',
        borderRadius:24,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:'15%'
    },
    loginBtn:{
        ...commonStyle.BoldFont,
        color:colors.black,
    },
})