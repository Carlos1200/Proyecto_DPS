import React, { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Fab } from "./Fab";
import { AuthContext } from "../context/auth/AuthContext";

export const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
  const {
    theme: {
      colors: { primary, background, text },
      secondary,
    },
  } = useContext(ThemeContext);

  const {
    auth: { nombre, apellido, foto },
    cerrarSesion,
  } = useContext(AuthContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: primary,
        marginTop: StatusBar.currentHeight,
      }}>
      <Fab
        iconName='menu-outline'
        onPress={() => navigation.toggleDrawer()}
        style={{ position: "absolute", top: 10, left: 12 }}
      />
      <View style={{ backgroundColor: background }}>
        <View style={{ backgroundColor: primary, borderBottomRightRadius: 40 }}>
          <View style={styles.imageContainer}>
            <Image
              source={foto ? { uri: foto } : require("../assets/user.png")}
              style={styles.image}
            />
            <View>
              <Text style={styles.textImage}>{nombre}</Text>
              <Text style={styles.textImage}>{apellido}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.buttonContainer, { backgroundColor: background }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.btn, { backgroundColor: secondary }]}
          onPress={() => navigation.navigate("Inicio")}>
          <Ionicons
            name='home'
            color={primary}
            style={{ fontSize: 25, marginLeft: 20 }}
          />
          <Text style={[styles.textBtn, { color: "white" }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.btn, { backgroundColor: secondary }]}
          onPress={() => navigation.navigate("NuevoProductoScreen")}>
          <Ionicons
            name='add-circle'
            color={primary}
            style={{ fontSize: 25, marginLeft: 20 }}
          />
          <Text style={[styles.textBtn, { color: "white" }]}>
            Nuevo Producto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.btn, { backgroundColor: secondary }]}
          onPress={() => navigation.navigate("MisProductosScreen")}>
          <Ionicons
            name='wine'
            color={primary}
            style={{ fontSize: 25, marginLeft: 20 }}
          />
          <Text style={[styles.textBtn, { color: "white" }]}>
            Mis Productos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.btn, { backgroundColor: secondary }]}
          onPress={() => navigation.navigate("MisPedidosScreen")}>
          <Ionicons
            name='clipboard-sharp'
            color={primary}
            style={{ fontSize: 25, marginLeft: 20 }}
          />
          <Text style={[styles.textBtn, { color: "white" }]}>Mis Pedidos</Text>
        </TouchableOpacity>
        <View style={styles.cuenta}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, { backgroundColor: secondary }]}
            onPress={() => navigation.navigate("MiCuentaScreen")}>
            <Ionicons
              name='person'
              color={primary}
              style={{ fontSize: 25, marginLeft: 20 }}
            />
            <Text style={[styles.textBtn, { color: "white" }]}>Mi Cuenta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.btn, { backgroundColor: secondary }]}
            onPress={() => cerrarSesion()}>
            <Ionicons
              name='log-in'
              color={primary}
              style={{ fontSize: 25, marginLeft: 20 }}
            />
            <Text style={[styles.textBtn, { color: "white" }]}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: 60,
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 40,
  },
  textImage: {
    marginLeft: 20,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 20,
    borderTopLeftRadius: 40,
    paddingTop: 40,
  },
  btn: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  textBtn: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 10,
  },
  cuenta: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
