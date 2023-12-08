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
        options={{
          headerTitle: 'Inicio de Sesión',
          headerTitleAlign: 'center',
        }}
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
