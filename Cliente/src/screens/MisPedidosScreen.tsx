import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Api from "../api";
import { ThemeContext } from "../context/theme/ThemeContext";
import { PedidosResponse, Pedido } from "../interfaces";
import { FlatList } from "react-native-gesture-handler";
import { PedidoReg } from "../components/PedidoReg";
import { darkTheme } from "../context/theme/ThemeReducer";
import { OrderContext } from "../context/order/OrderContext";

const { width } = Dimensions.get("window");

export const MisPedidosScreen = () => {
  const {
    theme: {
      colors: { text, primary, background },
      dark,
    },
  } = useContext(ThemeContext);

  const { misPedidos } = useContext(OrderContext);

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
            Mis Pedidos
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
      <View style={{ margin: 10 }}>
        <FlatList
          data={misPedidos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <PedidoReg pedido={item} />}
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
