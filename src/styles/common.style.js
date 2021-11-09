import {StyleSheet, Platform} from 'react-native';
import theme from './theme.style.js';

export default StyleSheet.create({
    RegularFont: {
        fontFamily: (Platform.OS === 'ios') ? theme.FONT_FAMILY : 'ArbFONTS-Tajawal-Regular',
        fontWeight: (Platform.OS === 'ios') ? theme.FONT_WEIGHT_REGULAR : theme.FONT_WEIGHT_REGULAR,
    },
    BoldItalicFont: {
        fontFamily: (Platform.OS === 'ios') ? theme.FONT_FAMILY : 'ArbFONTS-Tajawal-Bold-1',
        fontWeight: (Platform.OS === 'ios') ? theme.FONT_WEIGHT_SEMIBOLD : theme.FONT_WEIGHT_REGULAR,
    },
    RegularItalicFont: {
        fontFamily: (Platform.OS === 'ios') ? theme.FONT_FAMILY : 'ArbFONTS-Tajawal-Regular-1',
        fontWeight: (Platform.OS === 'ios') ? theme.FONT_WEIGHT_MEDIUM : theme.FONT_WEIGHT_REGULAR,
    },
    BoldFont: {
        fontFamily: (Platform.OS === 'ios') ? theme.FONT_FAMILY : 'ArbFONTS-Tajawal-Bold',
        fontWeight: (Platform.OS === 'ios') ? theme.FONT_WEIGHT_BOLD : theme.FONT_WEIGHT_REGULAR,
    },
    SemiBoldFont: {
        fontFamily: (Platform.OS === 'ios') ? theme.FONT_FAMILY : 'ArbFONTS-Tajawal-ExtraBold',
        fontWeight: (Platform.OS === 'ios') ? theme.FONT_WEIGHT_BOLD : theme.FONT_WEIGHT_REGULAR,
    },
    BlackFont: {
        fontFamily: (Platform.OS === 'ios') ? theme.FONT_FAMILY : 'ArbFONTS-Tajawal-Black',
        fontWeight: (Platform.OS === 'ios') ? theme.FONT_WEIGHT_BOLD : theme.FONT_WEIGHT_REGULAR,
    },
    LightFont: {
        fontFamily: (Platform.OS === 'ios') ? theme.FONT_FAMILY : 'ArbFONTS-Tajawal-Light',
        fontWeight: (Platform.OS === 'ios') ? theme.FONT_WEIGHT_BOLD : theme.FONT_WEIGHT_REGULAR,
    },
    MAIN_BTN_VIEW: {
        width: 327,
        height: 54,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 25,
        shadowColor: '#9b9b9b',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
        //borderRadius:5,


    },
    TRANSPARENT_BOTTOM_NAV_LINE: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    paddingTop:Platform.OS == 'ios'?35:0


});
