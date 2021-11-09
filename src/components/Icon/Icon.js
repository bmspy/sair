import PropTypes from 'prop-types';
import React from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text as NativeText,
} from 'react-native';
import {getIconType, ViewPropTypes} from '../../utils';
import styles from './styles';

/**
 * Represents an icon component.
 * @return {Component}
 */
const Icon = props => {
  const {
    color,
    component,
    containerStyle,
    iconStyle,
    name,
    onPress,
    raised,
    reverse,
    reverseColor,
    size,
    type,
    underlayColor,
    ...attributes
  } = props;

  let Component = View;

  if (onPress) {
    Component = TouchableOpacity;
  }

  if (component) {
    Component = component;
  }

  let Icon;

  if (!type) {
    Icon = getIconType('spoils');
  } else {
    Icon = getIconType(type);
  }

  /**
   * Renders the component.
   * @return {React native element}
   */
  return (
    <Component
      {...attributes}
      activeOpacity={0.5}
      underlayColor={reverse ? color : underlayColor || color}
      style={[
        (reverse || raised) && styles.button,
        (reverse || raised) && {
          borderRadius: size + 4,
          height: size * 2 + 4,
          width: size * 2 + 4,
        },
        raised && styles.raised,
        {
          backgroundColor: reverse ? color : raised ? 'white' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerStyle && containerStyle,
      ]}
      onPress={onPress}
    >
      <Icon
        style={[{ backgroundColor: 'transparent' }, iconStyle && iconStyle]}
        size={size}
        name={name}
        color={reverse ? reverseColor : color}
      />
    </Component>
  );
};

/**
 * Runtime type checking for React props.
 */
Icon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  component: PropTypes.func,
  underlayColor: PropTypes.string,
  reverse: PropTypes.bool,
  raised: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  iconStyle: NativeText.propTypes.style,
  onPress: PropTypes.func,
  reverseColor: PropTypes.string,
};

Icon.defaultProps = {
  underlayColor: 'white',
  reverse: false,
  raised: false,
  size: 24,
  color: 'black',
  reverseColor: 'white',
};

export default Icon;
