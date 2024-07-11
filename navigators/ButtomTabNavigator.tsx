import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OperacionesScreen from '../screens/OperacionesScreen';
import HistorialScreen from '../screens/HistorialScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Operaciones" component={OperacionesScreen} />
      <Tab.Screen name="Historial" component={HistorialScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
