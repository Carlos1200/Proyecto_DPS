import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigation } from "./DrawerNavigation";
import { LoginScreen } from "../screens/LoginScreen";
import { NuevoUsuarioScreen } from "../screens/NuevoUsuarioScreen";
import { AuthContext } from "../context/auth/AuthContext";
import { LoadingApp } from "../components/LoadingApp";

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  const {
    auth: { status },
    autenticar,
  } = useContext(AuthContext);
  useEffect(() => {
    autenticar();
  }, []);

  if (status === "checking") {
    return <LoadingApp />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {status === "authenticated" ? (
        <Stack.Screen name='Drawer' component={DrawerNavigation} />
      ) : (
        <>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='CrearCuenta' component={NuevoUsuarioScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
