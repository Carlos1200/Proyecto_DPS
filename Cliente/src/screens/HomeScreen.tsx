import React, { useContext, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";
import { Portal, PortalHost } from "@gorhom/portal";
import { ThemeContext } from "../context/theme/ThemeContext";
import { ProductCard } from "../components/ProductCard";
import { ProductContext } from "../context/product/ProductContext";
import { Producto } from "../interfaces";
import Modal from "../components/Modal";
import ProductDetail from "../components/ProductDetail";
import SearchBox from "../components/SearchBox";
import Filter from "../components/Filter";

const { width } = Dimensions.get("window");

export const HomeScreen = () => {
  const {
    theme: {
      colors: { text, background },
      dark,
    },
  } = useContext(ThemeContext);

  const { productos } = useContext(ProductContext);

  const [producto, setProducto] = useState<Producto>(null);
  const [filter, setFilter] = useState(false);
  const [tipo, setTipo] = useState("nombre");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const openModal = (productoRef: Producto) => {
    setProducto(productoRef);
    bottomSheetRef.current.expand();
  };
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
        <SearchBox setFilter={setFilter} openModal={openModal} tipo={tipo} />
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
            <Modal referencia={bottomSheetRef} setFilter={setFilter}>
              {filter ? (
                <Filter setTipo={setTipo} tipo={tipo} />
              ) : (
                <ProductDetail producto={producto} />
              )}
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
});
