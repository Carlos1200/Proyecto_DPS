import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";

export const MisProductosScreen = () => {
  const {
    theme: {
      colors: { text },
    },
  } = useContext(ThemeContext);
  return (
    <View>
      <Text style={{ color: text }}>Mis Productos</Text>
    </View>
  );
};
