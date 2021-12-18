import React from 'react';
import {I18nManager} from 'react-native';
import {Navigator} from './navigators';
import {Provider} from 'react-redux';
import {configureStore, persistor} from './redux/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import {NativeBaseProvider} from 'native-base';

// const store = configureStore();

I18nManager.forceRTL(true);
export default function Sayer() {
  return (
    <Provider store={configureStore}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <Navigator />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
