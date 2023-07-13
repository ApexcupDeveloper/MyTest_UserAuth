import React from 'react';
import {AppNavigator} from './src/navigations/navigation';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

export default () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
      <Toast position="top" autoHide visibilityTime={3000} topOffset={50} />
    </>
  );
};
