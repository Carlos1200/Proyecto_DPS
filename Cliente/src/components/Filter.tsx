import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Btn } from "./Btn";

interface Props {
  setTipo: React.Dispatch<React.SetStateAction<string>>;
  tipo: string;
}

const Filter = ({ setTipo, tipo }: Props) => {
  const {
    theme: {
      colors: { text, primary },
    },
  } = useContext(ThemeContext);

  const { close } = useBottomSheet();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: text }]}>Selecciona tu filtro</Text>
      <View style={styles.containerRadios}>
        <TouchableOpacity
          style={styles.radioView}
          onPress={() => setTipo("nombre")}>
          <View style={[styles.containerRadio, { borderColor: primary }]}>
            {tipo === "nombre" ? (
              <View style={[styles.radio, { backgroundColor: primary }]} />
            ) : null}
          </View>
          <Text style={[styles.text, { color: text }]}>Nombre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioView}
          onPress={() => setTipo("year")}>
          <View style={[styles.containerRadio, { borderColor: primary }]}>
            {tipo === "year" ? (
              <View style={[styles.radio, { backgroundColor: primary }]} />
            ) : null}
          </View>
          <Text style={[styles.text, { color: text }]}>Año</Text>
        </TouchableOpacity>
      </View>
      <Btn
        title='Cerrar'
        onpress={() => {
          close();
        }}
        style={{ width: "80%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  containerRadios: {
    flexDirection: "row",
    marginTop: 20,
  },
  radioView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  containerRadio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Filter;
