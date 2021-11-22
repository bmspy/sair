import {StyleSheet} from 'react-native';
import {colors} from '../../config';
import commonStyle from '../../styles/common.style';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerImge: {
    width: '100%',
    height: '100%',
  },
  address: {
    ...commonStyle.BlackFont,
    color: colors.white,
    fontSize: 22,
  },
  modal: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgb(194,8,8)',
  },
  hello: {
    width: '90%',
    ...commonStyle.BlackFont,
    color: colors.white,
    fontSize: 18,
    marginTop: '15%',
    marginBottom: '10%',
    textAlign: 'left',
  },
  label: {
    width: '90%',
    ...commonStyle.RegularFont,
    color: colors.white,
    fontSize: 16,
    marginTop: '3%',
    textAlign: 'left',
  },
  input: {
    ...commonStyle.RegularFont,
    color: colors.white,
    width: '90%',
    alignSelf: 'center',
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    textAlign: 'right',
    height: 45,
  },
  btn: {
    backgroundColor: colors.white,
    width: 309,
    height: 47,
    alignSelf: 'center',
    marginHorizontal: '10%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  loginBtn: {
    ...commonStyle.BoldFont,
    color: colors.primary,
  },
  forgetText: {
    width: '90%',
    ...commonStyle.RegularFont,
    color: colors.white,
    fontSize: 16,
    marginTop: '5%',
    textAlign: 'center',
  },
  newAccount: {
    width: '90%',
    marginTop: '30%',
    bottom: 0,
    position: 'absolute',
  },
  newAccountText: {
    ...commonStyle.RegularFont,
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});
