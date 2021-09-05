import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";

export const MisPedidosScreen = () => {
  const {
    theme: {
      colors: { text },
    },
  } = useContext(ThemeContext);
  return (
    <View>
      <Text style={{ color: text }}>Mis Pedidos</Text>
    </View>
  );
};
