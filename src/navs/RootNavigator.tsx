import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuthContext} from '../contexts/AuthProvider';
import {DefaultTheme} from '@react-navigation/native';
import {COLORS} from '../constants/colors';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import AppProvider from '../contexts/AppProvider';

const RootNavigator = () => {
  const {isAuthenticated, user} = useAuthContext();

  return (
    <NavigationContainer theme={navigationTheme}>
      {isAuthenticated && user ? (
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
    card: COLORS.white,
    primary: COLORS.black,
  },
};
