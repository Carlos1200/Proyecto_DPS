import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import Api from "../api";
import { ThemeContext } from "../context/theme/ThemeContext";

export const NuevoProductoScreen = () => {
  const {
    theme: {
      colors: { text },
    },
  } = useContext(ThemeContext);

  return (
    <View>
      <Text style={{ color: text }}>Nuevo Producto</Text>
    </View>
  );
};
