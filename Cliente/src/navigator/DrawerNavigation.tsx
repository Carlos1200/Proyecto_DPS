import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ThemeContext } from "../context/theme/ThemeContext";
import { TabsNavigator } from "./TabsNavigator";
import { NuevoProductoScreen } from "../screens/NuevoProductoScreen";
import { MisProductosScreen } from "../screens/MisProductosScreen";
import { MisPedidosScreen } from "../screens/MisPedidosScreen";
import { MiCuentaScreen } from "../screens/MiCuentaScreen";
import { Producto } from "../interfaces/index";

export type RootDrawerParams = {
  Inicio: undefined;
  NuevoProductoScreen: { producto?: Producto };
  MisProductosScreen: undefined;
  MisPedidosScreen: undefined;
  MiCuentaScreen: undefined;
};
const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigation = () => {
  const {
    theme: {
      colors: { background },
    },
  } = useContext(ThemeContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        sceneContainerStyle: {
          backgroundColor: background,
        },
      }}>
      <Drawer.Screen name='Inicio' component={TabsNavigator} />
      <Drawer.Screen
        name='NuevoProductoScreen'
        component={NuevoProductoScreen}
      />
      <Drawer.Screen name='MisProductosScreen' component={MisProductosScreen} />
      <Drawer.Screen name='MisPedidosScreen' component={MisPedidosScreen} />
      <Drawer.Screen name='MiCuentaScreen' component={MiCuentaScreen} />
    </Drawer.Navigator>
  );
};
