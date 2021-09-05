import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigation } from "./DrawerNavigation";
import { LoginScreen } from "../screens/LoginScreen";
import { NuevoUsuarioScreen } from "../screens/NuevoUsuarioScreen";

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Drawer' component={DrawerNavigation} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='CrearCuenta' component={NuevoUsuarioScreen} />
    </Stack.Navigator>
  );
};
