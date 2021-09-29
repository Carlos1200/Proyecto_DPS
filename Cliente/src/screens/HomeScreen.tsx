import React, { useContext, useEffect, useState } from "react";
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Api from "../api";
import { Input } from "../components/Input";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Producto, ProductosResponse } from "../interfaces";
import { FlatList } from "react-native-gesture-handler";
import { ProductCard } from "../components/ProductCard";

const { width } = Dimensions.get("window");

export const HomeScreen = () => {
  const {
    theme: {
      colors: { text, background, primary },
      dark,
    },
  } = useContext(ThemeContext);

  const [productos, setProductos] = useState<Producto[]>();
  const [refreshing, setRefreshing] = useState(false);

  const ObtenerProductos = async () => {
    const { data } = await Api.get<ProductosResponse>("/producto");
    setProductos(data.productos);
  };

  const onRefresh = () => {
    setRefreshing(true);

    ObtenerProductos();
    setRefreshing(false);
  };

  useEffect(() => {
    ObtenerProductos();
  }, []);

  return (
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
          style={[styles.icons, { position: "absolute", bottom: 1, left: 6 }]}
        />
        <TextInput style={styles.filter} placeholder='Buscar' />
        <Ionicons
          name='options'
          color={primary}
          style={[styles.icons, { position: "absolute", bottom: 1, right: 6 }]}
        />
      </View>
      <View style={{ flex: 1, alignSelf: "center" }}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              enabled={true}
              progressBackgroundColor={primary}
            />
          }
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
          data={productos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard producto={item} />}
          numColumns={width >= 1000 ? 3 : 1}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ marginBottom: 100 }} />}
        />
      </View>
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
