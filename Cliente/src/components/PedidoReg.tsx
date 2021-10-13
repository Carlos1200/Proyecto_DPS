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
import { FlatList } from "react-native-gesture-handler";
import { Pedido } from "../interfaces";
import { Producto } from "../interfaces"

interface Props {
  pedido: Pedido;
}

export const PedidoReg = ({ pedido }: Props) => {
  const {
    theme: {
      colors: { text, background, primary },
      dark,
    },
  } = useContext(ThemeContext);

  const { _id, estado, creado, cantidad, total, comprador, producto } =
    pedido;

  return (
    <View style={styles.cardExt}>      
      <View style={styles.centro}>
        <Text style={[styles.nombre, { color: text }]}>{_id}</Text>
        <Text style={[styles.nombre, { color: text }]}>{estado}</Text>
        <Text style={[styles.precio, { color: primary }]}>$ {total}</Text>
        <FlatList
          data={producto}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Text style={[styles.precio, { color: text }]} >{item.nombre}: ${item.precio}</Text>}          
          showsVerticalScrollIndicator={false}          
        />
      </View>      
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
    width:'60%'
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
    marginBottom:10,
    fontWeight: "bold",
  }  
});
