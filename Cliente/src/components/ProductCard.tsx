import React, { useContext } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Producto } from "../interfaces";

interface Props {
  producto: Producto;
  openModal: (productoRef: Producto) => void;
}

export const ProductCard = ({ producto, openModal }: Props) => {
  const {
    theme: {
      colors: { primary },
    },
  } = useContext(ThemeContext);

  const { nombre, year, precio, foto } = producto;

  return (
    <TouchableOpacity
      style={styles.cardExt}
      activeOpacity={0.8}
      onPress={() => openModal(producto)}>
      <View style={styles.cardInt}>
        <Image source={{ uri: foto }} style={styles.picture} />
      </View>
      <View>
        <Text style={[styles.nombre]}>{nombre}</Text>
        <Text style={[styles.nombre]}>{year}</Text>
        <Text style={[styles.precio, { color: primary }]}>$ {precio}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardExt: {
    backgroundColor: "#343F4B",
    padding: 5,
    margin: 5,
    borderRadius: 10,
  },
  cardInt: {
    backgroundColor: "#5A6978",
    padding: 5,
    borderRadius: 10,
  },
  picture: {
    height: 260,
    width: 330,
    alignSelf: "center",
    resizeMode: "contain",
  },
  nombre: {
    textAlign: "left",
    fontSize: 20,
    marginTop: 5,
    marginLeft: 10,
    color: "white",
  },
  precio: {
    textAlign: "right",
    fontSize: 25,
    marginRight: 10,
    fontWeight: "bold",
  },
});
