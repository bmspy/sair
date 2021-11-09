import { StyleSheet } from "react-native";
import { colors } from "../../config"; 
import commonStyle from "../../styles/common.style";

export default StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        flex:1
    },
    slide:{
        alignItem:'center',
        justifyContent:'center',
        flex:1,
        paddingBottom:100
    },
    title:{
        alignSelf:'center',
        color:colors.white,
        ...commonStyle.BoldFont,
        fontSize:18
    },
    text:{
        color:colors.white,
        ...commonStyle.RegularFont,
        marginHorizontal:'5%',
        textAlign:'justify',
        alignSelf:'center',
        fontSize:16
    },
    img:{
        alignSelf:'center',
        marginVertical:'2%'
    },
    activeDotStyle:{
        backgroundColor: 'white',
        width:80,
        marginBottom:400
    },
    dotStyle:{
        backgroundColor: 'gray',
        width:80,
        marginBottom:400
      },
      btn:{
          backgroundColor:colors.white,
          width:309,
          height:47,
          alignSelf:'center',
          marginHorizontal:'10%',
          borderRadius:24,
          alignItems:'center',
          justifyContent:'center',
        //   marginBottom:100
      },
      next:{
          ...commonStyle.BoldFont,
          color:colors.black,
      },
      skip:{
          marginTop:'24%'
      }
})