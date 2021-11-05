import React, { useContext, useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Pedido } from "../interfaces";
import { Producto } from "../interfaces";
import Api from "../api";
import { OrderContext } from "../context/order/OrderContext";

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

  const { actualizarEstado } = useContext(OrderContext);

  const { _id, estado, cantidad } = pedido;

  return (
    <View style={[styles.contenedor]}>
      {pedido.producto[0] ? (
        <>
          <Image source={{ uri: pedido.producto[0].foto }} style={styles.img} />
          <View style={[styles.contenedorinfo, { paddingBottom: 30 }]}>
            <Text style={styles.title}>{pedido.producto[0].nombre}</Text>
            <Text style={styles.label}>Cantidad: {cantidad}</Text>
            <Text
              style={[
                styles.label,
                { color: estado === "Pendiente" ? "red" : "green" },
              ]}>
              Estado:
            </Text>
            <Text
              style={[
                styles.label,
                { color: estado === "Pendiente" ? "red" : "green" },
              ]}>
              {estado}
            </Text>
            {estado === "Pendiente" && (
              <TouchableOpacity
                style={styles.btnComplete}
                onPress={() => {
                  actualizarEstado(_id, "Completado");
                }}>
                <Text
                  style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                  Completar
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={[styles.price, { color: primary }]}>
            $ {pedido.producto[0].precio}
          </Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 25,
    borderRadius: 20,
    flexDirection: "row",
  },
  img: {
    width: 110,
    height: 110,
    margin: 20,
    alignSelf: "center",
    resizeMode: "contain",
  },
  contenedorinfo: {
    marginVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 7,
  },
  label: {
    fontSize: 20,
    marginTop: 7,
  },
  price: {
    position: "absolute",
    bottom: 6,
    right: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  btn: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 25,
  },
  btnComplete: {
    borderRadius: 20,
    backgroundColor: "#13CE66",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 10,
  },
});
