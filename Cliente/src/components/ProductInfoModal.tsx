import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Producto } from "../interfaces/index";
import { RootDrawerParams } from "../navigator/DrawerNavigation";
import { Btn } from "./Btn";

interface Props {
  producto: Producto;
  navigation: DrawerNavigationProp<RootDrawerParams, "MisProductosScreen">;
}

const ProductInfoModal = ({ producto, navigation }: Props) => {
  const {
    theme: {
      colors: { text },
    },
  } = useContext(ThemeContext);

  const { close } = useBottomSheet();
  return (
    <View style={styles.contenedor}>
      {producto && (
        <>
          <View style={styles.header}>
            <Text style={[styles.title, { color: text }]}>
              {producto.nombre}
            </Text>
            <Image source={{ uri: producto.foto }} style={styles.imagen} />
          </View>
          <View style={{ marginTop: 20 }}>
            {producto.informacion && (
              <>
                <Text style={[styles.label, { color: text }]}>Información</Text>
                <Text style={[styles.info, { color: text }]}>
                  {producto.informacion}
                </Text>
              </>
            )}
            <Text style={[styles.label, { color: text }]}>Año</Text>
            <Text style={[styles.info, { color: text }]}>{producto.year}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}>
              <Text style={[styles.label, { color: text }]}>
                Precio: $ {producto.precio}
              </Text>
              <Text style={[styles.label, { color: text }]}>
                Cantidad: {producto.existencia}
              </Text>
            </View>
            <Btn
              title='Editar Producto'
              onpress={() => {
                navigation.jumpTo("NuevoProductoScreen", { producto });
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
});

export default ProductInfoModal;
