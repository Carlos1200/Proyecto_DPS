import React, { useContext } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";

export const CarritoScreen = () => {
  const {
    theme: {
      colors: { text, background, primary },
      dark,
    },
  } = useContext(ThemeContext);
  return (
    <>
      <View style={styles.titlebox}>
        <View>
          <Text style={[styles.title, { color: text }]}>Twist and Wine</Text>
          <Text style={[styles.subtitle, { color: text }]}>
            Carrito de compras 
          </Text>
        </View>
        <Image
          style={[styles.logo, { backgroundColor: background }]}
          source={
            dark
              ? require("../assets/logoOscuro.png")
              : require("../assets/logoClaro.png")
          }
        />
      </View>
      <View>
          
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 90,
    height: 90,
    borderRadius: 30,
  },
  titlebox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
  },

})