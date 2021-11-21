import React from 'react';
import {I18nManager} from 'react-native';
import {Navigator} from './navigators';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/Store';
import {PersistGate} from 'redux-persist/integration/react';

I18nManager.forceRTL(true);
export default function Sayer() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
