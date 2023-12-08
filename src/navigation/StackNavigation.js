import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from '../screens/auth/Login';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
      />

      <Stack.Screen
        name='Admin'
        component={BottomTabNavigation}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
