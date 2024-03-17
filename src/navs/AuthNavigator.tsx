import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from './routes';
import {
  Biometrics,
  Login,
  Onboarding,
  Register,
  SecurityQuestion,
} from '../screens';

const AuthNavigator = () => {
  const StackNav = createNativeStackNavigator();
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen component={Onboarding} name={ROUTES.ONBOARDING} />
      <StackNav.Screen component={Login} name={ROUTES.LOGIN} />
      <StackNav.Screen component={Register} name={ROUTES.REGISTER} />
      <StackNav.Screen component={Biometrics} name={ROUTES.BIOMETRICS} />
      <StackNav.Screen
        component={SecurityQuestion}
        name={ROUTES.SECURITY_QUESTION}
      />
    </StackNav.Navigator>
  );
};

export default AuthNavigator;
