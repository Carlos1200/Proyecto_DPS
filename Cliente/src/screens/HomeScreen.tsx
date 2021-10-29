import React, { useContext, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import { Portal, PortalHost } from "@gorhom/portal";
import { ThemeContext } from "../context/theme/ThemeContext";
import { ProductCard } from "../components/ProductCard";
import { ProductContext } from "../context/product/ProductContext";
import { Producto } from "../interfaces";
import Modal from "../components/Modal";
import ProductDetail from "../components/ProductDetail";

const { width } = Dimensions.get("window");

export const HomeScreen = () => {
  const {
    theme: {
      colors: { text, background, primary },
      dark,
    },
  } = useContext(ThemeContext);

  const { productos } = useContext(ProductContext);

  const [producto, setProducto] = useState<Producto>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const openModal = (productoRef: Producto) => {
    setProducto(productoRef);
    bottomSheetRef.current.expand();
  };

  //TODO refresh control
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     ObtenerProductos();
  //   }, 1500);

  //   setRefreshing(false);
  // };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
        }}>
        <View style={styles.titlebox}>
          <View>
            <Text style={[styles.title, { color: text }]}>Twist and Wine</Text>
            <Text style={[styles.subtitle, { color: text }]}>
              Adquiere los Mejores Vinos
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
        <View style={styles.filterbox}>
          <Ionicons
            name='search'
            color={primary}
            style={[
              styles.icons,
              { position: "absolute", bottom: 1, left: 6, zIndex: 9999 },
            ]}
          />
          <TextInput style={styles.filter} placeholder='Buscar' />
          <Ionicons
            name='options'
            color={primary}
            style={[
              styles.icons,
              { position: "absolute", bottom: 1, right: 6 },
            ]}
          />
        </View>
        <View style={{ flex: 1, alignSelf: "center" }}>
          <FlatList
            data={productos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ProductCard producto={item} openModal={openModal} />
            )}
            numColumns={width >= 1000 ? 2 : 1}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <View style={{ marginBottom: 100 }} />}
          />
        </View>
        {Platform.OS !== "web" ? (
          <Portal>
            <Modal referencia={bottomSheetRef}>
              <ProductDetail producto={producto} />
            </Modal>
          </Portal>
        ) : null}
      </SafeAreaView>
      <PortalHost name='custom_host' />
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
