import React, { BaseSyntheticEvent, useContext } from "react";
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
  onpress: any;
}

export const Btn = ({ title, style, onpress }: Props) => {
  const {
    theme: {
      colors: { primary },
    },
  } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.btn, { backgroundColor: primary }, style]}
      onPress={onpress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginTop: 50,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
