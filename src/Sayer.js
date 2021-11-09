import React from 'react';
import { I18nManager } from 'react-native';
import { Navigator } from './navigators';

I18nManager.forceRTL(true)
export default function Sayer () {
  return (
    <Navigator/>
  );
}