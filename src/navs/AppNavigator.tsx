import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import BottomTabNavigator from './BottomTabNavigator';
import {AddNewRecord, Profile} from '../screens';

const AppNavigator = () => {
  const StackNav = createNativeStackNavigator();
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen
        component={BottomTabNavigator}
        name={ROUTES.BOTTOM_TABS}
      />
      <StackNav.Screen component={Profile} name={ROUTES.PROFILE} />
      <StackNav.Screen component={AddNewRecord} name={ROUTES.ADD_NEW_RECORD} />
    </StackNav.Navigator>
  );
};

export default AppNavigator;
