import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ROUTES } from './routes';
import { Login, Register } from '../screens';

const AuthNavigator = () => {
  const StackNav = createNativeStackNavigator();
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen component={Login} name={ROUTES.LOGIN} />
      <StackNav.Screen component={Register} name={ROUTES.REGISTER} />
    </StackNav.Navigator>
  )
}

export default AuthNavigator