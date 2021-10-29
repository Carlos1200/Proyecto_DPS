import { useBottomSheet } from "@gorhom/bottom-sheet";
import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Producto } from "../interfaces";
import { Btn } from "./Btn";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CartContext } from "../context/cart/CartContext";

interface Props {
  producto: Producto;
}

const ProductDetail = ({ producto }: Props) => {
  const {
    theme: {
      colors: { text, primary },
    },
  } = useContext(ThemeContext);

  const { agregarProducto } = useContext(CartContext);

  const { close } = useBottomSheet();

  const [cantidad, setCantidad] = useState(1);

  return (
    <View style={styles.contenedor}>
      {producto && (
        <>
          <View style={styles.header}>
            <Text
              style={[styles.title, { color: text, borderBottomColor: text }]}>
              {producto.nombre}
            </Text>
            <Image source={{ uri: producto.foto }} style={styles.imagen} />
          </View>
          <View style={{ marginTop: 20 }}>
            {producto.informacion && (
              <View style={{ borderBottomWidth: 1, borderBottomColor: text }}>
                <Text style={[styles.label, { color: text }]}>Información</Text>
                <Text style={[styles.info, { color: text, marginBottom: 7 }]}>
                  {producto.informacion}
                </Text>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}>
              <Text style={[styles.label, { color: text }]}>
                Año: {producto.year}
              </Text>
              <Text style={[styles.label, { color: text }]}>
                Precio: $ {producto.precio}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}>
                <Text style={[styles.label, { color: text }]}>Cantidad</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      if (cantidad - 1 > 0) {
                        setCantidad(cantidad - 1);
                      }
                    }}>
                    <Ionicons
                      name='remove-circle'
                      color={primary}
                      style={[styles.icons, { marginTop: 10 }]}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.label, { color: text }]}>
                    {cantidad}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setCantidad(cantidad + 1)}>
                    <Ionicons
                      name='add-circle'
                      color={primary}
                      style={[styles.icons, { marginTop: 10 }]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.label, { color: text }]}>
                Total: {cantidad * producto.precio}
              </Text>
            </View>
            <Btn
              title='Agregar a Carrito'
              onpress={() => {
                agregarProducto(producto);
                close();
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    marginHorizontal: 30,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    borderBottomWidth: 2,
  },
  imagen: {
    height: 250,
    width: 250,
    alignSelf: "center",
    resizeMode: "contain",
  },
  label: {
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 10,
  },
  info: {
    fontSize: 18,
  },
  icons: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default ProductDetail;
