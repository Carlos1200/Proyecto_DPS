import React, { useContext, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import Api from "../api";
import ProductInfo from "../components/ProductInfo";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Producto, ProductosResponse } from "../interfaces";
import Modal from "../components/Modal";
import ProductInfoModal from "../components/ProductInfoModal";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParams } from "../navigator/DrawerNavigation";
import { ProductContext } from "../context/product/ProductContext";

const { width } = Dimensions.get("window");

interface Props
  extends DrawerScreenProps<RootDrawerParams, "MisProductosScreen"> {}

export const MisProductosScreen = ({ navigation }: Props) => {
  const {
    theme: {
      colors: { text },
    },
  } = useContext(ThemeContext);

  const { misProductos, AgregarMisProductos } = useContext(ProductContext);

  const [producto, setProducto] = useState<Producto>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const openModal = (productoRef: Producto) => {
    setProducto(productoRef);
    bottomSheetRef.current.expand();
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const { data } = await Api.get<ProductosResponse>("/producto/propios");

    AgregarMisProductos(data.productos);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}>
      <View style={styles.titlebox}>
        <View>
          <Text style={[styles.title, { color: text }]}>Twist and Wine</Text>
          <Text style={[styles.subtitle, { color: text, textAlign: "center" }]}>
            Mis Productos
          </Text>
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <FlatList
          data={misProductos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ProductInfo producto={item} open={openModal} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={width >= 1000 ? 2 : 1}
          ListFooterComponent={() => <View style={{ marginBottom: 100 }} />}
        />
      </View>
      {Platform.OS !== "web" ? (
        <Modal referencia={bottomSheetRef}>
          <ProductInfoModal producto={producto} navigation={navigation} />
        </Modal>
      ) : null}
    </SafeAreaView>
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
  },
  filterbox: {
    marginTop: 20,
    width: width >= 1000 ? "50%" : "80%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
  },
  icons: {
    fontSize: 30,
    fontWeight: "bold",
  },
  filter: {
    width: "100%",
    color: "#000000",
    backgroundColor: "#FFF",
    paddingLeft: 70,
    paddingVertical: 5,
    marginHorizontal: 40,
    fontSize: 20,
    borderRadius: 30,
  },
});
