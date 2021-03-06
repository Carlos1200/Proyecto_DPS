import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";

import Api from "../api";

import { ThemeContext } from "../context/theme/ThemeContext";
import { FlatList } from "react-native-gesture-handler";
import { CarritoCard } from "../components/CarritoCard";
import { CartContext } from "../context/cart/CartContext";
import { Btn } from "../components/Btn";
import { AuthContext } from "../context/auth/AuthContext";
import { OrderContext } from "../context/order/OrderContext";

const { width } = Dimensions.get("window");

export const CarritoScreen = () => {
  const {
    theme: {
      colors: { text, background },
      dark,
    },
  } = useContext(ThemeContext);
  const {
    auth: { _id },
  } = useContext(AuthContext);
  const { reiniciarCarrito, productos, total } = useContext(CartContext);
  const { obtenerTodosPedidos } = useContext(OrderContext);

  const [error, setError] = useState(null);

  const onSubmit = async () => {
    const arregloproductos = [];
    productos.forEach((producto) => {
      arregloproductos.push({
        producto: producto._id,
        cantidad: producto.cantidad,
      });
    });
    try {
      const { data } = await Api.post("/pedidos", {
        productos: arregloproductos,
        total,
        creador: _id,
      });
      reiniciarCarrito();
      obtenerTodosPedidos();
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
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
            Carrito de compras
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
        <Text
          style={[
            styles.subtitle,
            { color: text, textAlign: "right", margin: 10 },
          ]}>
          Total de la compra: ${total}
        </Text>
        <FlatList
          data={productos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CarritoCard producto={item} cantidad={item.cantidad} />
          )}
          //numColumns={width >= 1000 ? 3 : 1}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <>
              {productos.length > 0 && (
                <Btn title='Crear pedido' onpress={onSubmit} />
              )}
              <View style={{ marginBottom: 300 }} />
            </>
          )}
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
