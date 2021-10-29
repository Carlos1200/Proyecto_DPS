import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Producto } from "../interfaces/index";
import { useNavigation } from "@react-navigation/native";

interface Prop {
  producto: Producto;
  open: (productoRef: Producto) => void;
}

const ProductInfo = ({ producto, open }: Prop) => {
  const { nombre, year, existencia, precio, foto } = producto;
  const {
    theme: {
      colors: { primary },
    },
  } = useContext(ThemeContext);

  const navigation: any = useNavigation();
  const [opacity, setOpacity] = useState(1);

  return (
    <Pressable
      style={[styles.contenedor, { opacity }]}
      onLongPress={() => open(producto)}
      onPressIn={() => setOpacity(0.8)}
      onPressOut={() => setOpacity(1)}>
      <Image source={{ uri: foto }} style={styles.img} />
      <View style={styles.contenedorinfo}>
        <Text style={styles.title}>{nombre}</Text>
        <Text style={styles.label}>Año: {year}</Text>
        <Text style={styles.label}>Cantidad: {existencia}</Text>
      </View>
      <Text style={[styles.price, { color: primary }]}>${precio} </Text>
    </Pressable>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#FFF",
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    flexDirection: "row",
  },
  img: {
    width: 150,
    height: 150,
    margin: 10,
    alignSelf: "center",
    resizeMode: "contain",
  },
  contenedorinfo: {
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    color: "#47525E",
  },
  label: {
    fontSize: 16,
    marginTop: 7,
  },
  price: {
    position: "absolute",
    bottom: 10,
    right: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});
