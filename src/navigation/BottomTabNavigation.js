import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons'

// Screens
import Home from '../screens/admin/Home';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const isAdmin = true;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name == 'AdminS') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          // headerShown: false,
          headerTitle: 'Bienes Raíces',
        }}
      />

      {isAdmin ? (
        <Tab.Screen
          name='AdminS'
          component={Home}
          options={{
            headerTitle: 'Crear Inmueble',
          }}
        />
      ) : (
        <Tab.Screen
          name='Favorites'
          component={Home}
          options={{
            headerTitle: 'Favoritos',
          }}
        />
      )}

    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
