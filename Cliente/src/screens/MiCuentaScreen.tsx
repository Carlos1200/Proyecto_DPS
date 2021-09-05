import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";

export const MiCuentaScreen = () => {
  const {
    theme: {
      colors: { text },
    },
  } = useContext(ThemeContext);
  return (
    <View>
      <Text style={{ color: text }}>Mi Cuenta</Text>
    </View>
  );
};
