import React, { useContext } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/theme/ThemeContext";
const { width } = Dimensions.get("window");

export const BottomTabs = ({ navigation }: BottomTabBarProps) => {
  const {
    theme: {
      colors: { primary },
    },
  } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("HomeScreen")}>
        <Ionicons name='wine-sharp' color={primary} style={styles.icon} />
        <Text style={styles.text}>Vinos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("CarritoScreen")}>
        <Ionicons name='cart' color={primary} style={styles.icon} />
        <Text style={styles.text}>Carrito</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("OrdenesScreen")}>
        <Ionicons name='clipboard' color={primary} style={styles.icon} />
        <Text style={styles.text}>Ordenes</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 20,
    bottom: 10,
    alignSelf: "center",
    width: width >= 1000 ? "50%" : "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
  },
  icon: {
    fontSize: 35,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
