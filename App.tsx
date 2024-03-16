import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import RootNavigator from './src/navs/RootNavigator';
import AppProvider from './src/contexts/AppProvider';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={{flex: 1}}>
        <RootNavigator />
      </SafeAreaView>

      <StatusBar animated barStyle="dark-content" backgroundColor="#fff" />
      <Toast />
    </AppProvider>
  );
}
