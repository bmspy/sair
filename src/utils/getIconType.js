import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const customIcons = {};

export const registerCustomIconType = (id, customIcon) => {
  customIcons[id] = customIcon;
};

/**
 * Get vector icon
 * @param {string} type
 * @return {object} icon object
 */
export default type => {
  switch (type) {
    case 'zocial':
      return ZocialIcon;
    case 'octicon':
      return OcticonIcon;
    case 'material':
      return MaterialIcon;
    case 'material-community':
      return MaterialCommunityIcon;
    case 'ionicon':
      return Ionicon;
    case 'foundation':
      return FoundationIcon;
    case 'evilicon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'font-awesome':
      return FAIcon;
      case 'font-awesome5':
      return Icon;
    case 'simple-line-icon':
      return SimpleLineIcon;
    case 'feather':
      return FeatherIcon;
      case 'AntDesign':
      return AntDesign;
      case 'FontAwesome5':
        return FontAwesome5
    default:
      if (customIcons.hasOwnProperty(type)) {
        return customIcons[type];
      }
      return MaterialIcon;
  }
};
