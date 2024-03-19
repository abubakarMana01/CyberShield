import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import RootNavigator from './src/navs/RootNavigator';
import AuthProvider from './src/contexts/AuthProvider';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{flex: 1}}>
        <RootNavigator />
      </SafeAreaView>

      <StatusBar animated barStyle="dark-content" backgroundColor="#fff" />
      <Toast />
    </AuthProvider>
  );
}
