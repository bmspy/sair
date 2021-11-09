import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../config';
import commonStyle from '../../styles/common.style';

export default StyleSheet.create({
    content:{
        height: Dimensions.get('screen').height
    },
    address:{
        ...commonStyle.BlackFont,
        color:colors.black,
        fontSize:18,
        // textAlign:'center',
        marginTop:Platform.OS=='ios'?'12%':'8%',
        width:'90%',
        alignSelf:'center',
        height:60,
        
    },
    sideHeader:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:'5%',
        height:60
    },
    text:{
        ...commonStyle.RegularFont,
        fontSize:15,
        textAlignVertical:'top',
        marginHorizontal:'5%',
        color:colors.black,
        height:'70%',
        paddingHorizontal:'5%'
    },
    footer:{
        width:'90%',
        alignSelf:'center',
        backgroundColor:colors.primary,
        height:40,
        borderRadius:10,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:'10%'
    }
})