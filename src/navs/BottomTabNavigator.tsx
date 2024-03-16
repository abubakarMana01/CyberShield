/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Analysis, Home, Search, Settings} from '../screens';
import {ROUTES} from './routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../constants/colors';
import {TouchableOpacity} from 'react-native';
import {useNavigate} from '../hooks';

const BottomTabNavigator = () => {
  const BottomTabs = createBottomTabNavigator();
  const {navigate} = useNavigate();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: '500',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigate(ROUTES.PROFILE)}>
            <FontAwesome name="user-o" size={24} color={COLORS.black} />
          </TouchableOpacity>
        ),
        headerLeftContainerStyle: {left: 16},
        headerRight: () => (
          <TouchableOpacity onPress={() => navigate(ROUTES.ADD_NEW_RECORD)}>
            <Ionicons name="add" size={28} color={COLORS.black} />
          </TouchableOpacity>
        ),
        headerRightContainerStyle: {right: 16},
      }}>
      <BottomTabs.Screen
        name={ROUTES.HOME}
        component={Home}
        options={{
          headerTitle: 'Passwords',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name={ROUTES.ANALYSIS}
        component={Analysis}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name={focused ? 'chart-box' : 'chart-box-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name={ROUTES.SEARCH}
        component={Search}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name={ROUTES.SETTINGS}
        component={Settings}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
