import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/theme/ThemeContext";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { ProductContext } from "../context/product/ProductContext";

const { width } = Dimensions.get("window");

const SearchBox = ({ setFilter, openModal, tipo }) => {
  const {
    theme: {
      colors: { primary },
    },
  } = useContext(ThemeContext);

  const { buscarProductos } = useContext(ProductContext);

  const [textValue, setTextValue] = useState("");

  const debouncedValue = useDebouncedValue(textValue);

  useEffect(() => {
    setTextValue("");
  }, [tipo]);

  useEffect(() => {
    buscarProductos(debouncedValue, tipo);
  }, [debouncedValue]);

  return (
    <View style={styles.filterbox}>
      <Ionicons
        name='search'
        color={primary}
        style={[
          styles.icons,
          { position: "absolute", bottom: 1, left: 6, zIndex: 9999 },
        ]}
      />
      <TextInput
        style={styles.filter}
        placeholder='Buscar'
        value={textValue}
        keyboardType={tipo === "nombre" ? "default" : "numeric"}
        onChangeText={(value) => {
          setTextValue(value);
        }}
      />
      <Ionicons
        name='options'
        color={primary}
        style={[styles.icons, { position: "absolute", bottom: 1, right: 6 }]}
        onPress={() => {
          setFilter(true);
          openModal(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SearchBox;
