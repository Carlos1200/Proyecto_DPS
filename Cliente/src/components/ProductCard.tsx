import React, { useContext } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
} from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Producto } from "../interfaces";

interface Props {
  producto: Producto;
}

export const ProductCard = ({ producto }: Props) => {
  const {
    theme: {
      colors: { text, background, primary },
      dark,
    },
  } = useContext(ThemeContext);

  const { _id, informacion, nombre, year, precio, creador, existencia, foto } =
    producto;

  return (
    <View style={styles.cardExt}>
      <View style={styles.cardInt}>
        <Image source={{ uri: foto }} style={styles.picture} />
      </View>
      <View>
        <Text style={[styles.nombre]}>{nombre}</Text>
        <Text style={[styles.nombre]}>{year}</Text>
        <Text style={[styles.precio, { color: primary }]}>$ {precio}</Text>
      </View>
    </View>
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
