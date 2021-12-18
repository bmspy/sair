import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import UIReducer from './reducers/UIReducer';
import UserReducer from './reducers/UserReducer';
import NoteReducer from './reducers/NoteReducer';
import PlanReducer from './reducers/PlanReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  ui: UIReducer,
  user: UserReducer,
  note: NoteReducer,
  plan: PlanReducer,
});

export const configureStore = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(thunk),
);

export const persistor = persistStore(configureStore);

// OLD CODE
// import {createStore} from 'redux';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';

// import rootReducer from '../redux/reducers/UserReducer';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create a Redux store holding the state of your app.
// // Its API is { subscribe, dispatch, getState }.
// const createdStore = createStore(persistedReducer);
// const createdPersistor = persistStore(createdStore);

// export const store = createdStore;
// export const persistor = createdPersistor;
