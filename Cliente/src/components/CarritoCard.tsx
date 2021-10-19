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
}

export const CarritoCard = ({ producto }: Props) => {
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
      <View style={styles.centro}>
        <Text style={[styles.nombre, { color: text }]}>{nombre}</Text>
        <Text style={[styles.nombre, { color: text }]}>{year}</Text>
        <Text style={[styles.precio, { color: primary }]}>$ {precio}</Text>
      </View>
      <TouchableOpacity>
        <Text style={[styles.eliminar, { color: primary }]}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardExt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  centro: {
    width: "60%",
  },
  picture: {
    height: 70,
    width: 70,
    resizeMode: "contain",
  },
  nombre: {
    textAlign: "left",
    fontSize: 16,
    marginTop: 5,
    marginLeft: 10,
  },
  precio: {
    textAlign: "right",
    fontSize: 20,
    marginRight: 30,
    marginBottom: 10,
    fontWeight: "bold",
  },
  eliminar: {
    // backgroundColor:'#5A6978',
    borderRadius: 10,
    marginLeft: 5,
    padding: 5,
    textAlign: "right",
    fontSize: 18,
    marginRight: 5,
    fontWeight: "bold",
  },
});
