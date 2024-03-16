import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAppContext} from '../contexts/AppProvider';
import {DefaultTheme} from '@react-navigation/native';
import {COLORS} from '../constants/colors';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const RootNavigator = () => {
  const {user} = useAppContext();

  return (
    <NavigationContainer theme={navigationTheme}>
      {user ? <AppNavigator /> : <AuthNavigator />}
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
