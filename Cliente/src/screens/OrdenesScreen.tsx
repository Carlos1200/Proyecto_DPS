import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { Portal, PortalHost } from "@gorhom/portal";
import BottomSheet from "@gorhom/bottom-sheet";
import { ThemeContext } from "../context/theme/ThemeContext";
import Modal from "../components/Modal";
import { Pedido } from "../interfaces";
import { OrderCard } from "../components/OrderCard";
import PedidoDetail from "../components/PedidoDetail";
import { OrderContext } from "../context/order/OrderContext";

const { width } = Dimensions.get("window");

export const OrdenesScreen = () => {
  const {
    theme: {
      colors: { text, background },
      dark,
    },
  } = useContext(ThemeContext);

  const { pedidos } = useContext(OrderContext);

  const [pedido, setPedido] = useState<Pedido>();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const openModal = (pedidoRef: Pedido) => {
    setPedido(pedidoRef);
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
        <View style={{ flex: 1, alignSelf: "center" }}>
          <FlatList
            data={pedidos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <OrderCard pedido={item} openModal={openModal} />
            )}
            numColumns={width >= 1000 ? 2 : 1}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => <View style={{ marginBottom: 100 }} />}
          />
        </View>
        {Platform.OS !== "web" ? (
          <Portal>
            <Modal referencia={bottomSheetRef}>
              {pedido && <PedidoDetail pedido={pedido} />}
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
