import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/HomeScreen";
import { CarritoScreen } from "../screens/CarritoScreen";
import { OrdenesScreen } from "../screens/OrdenesScreen";
import { ThemeContext } from "../context/theme/ThemeContext";
import { BottomTabs } from "../components/BottomTabs";

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  const {
    theme: {
      colors: { background },
    },
  } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      sceneContainerStyle={{
        backgroundColor: background,
      }}
      tabBar={(prop) => <BottomTabs {...prop} />}>
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='CarritoScreen' component={CarritoScreen} />
      <Tab.Screen name='OrdenesScreen' component={OrdenesScreen} />
    </Tab.Navigator>
  );
};
