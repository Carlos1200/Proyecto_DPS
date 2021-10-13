import React, { useContext } from "react";
import { StyleProp, Text, View, ViewStyle, StyleSheet } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";

interface Props {
  title: string;
  styleProp?: StyleProp<ViewStyle>;
}

export const Header = ({ title, styleProp }: Props) => {
  const {
    theme: {
      colors: { text },
    },
  } = useContext(ThemeContext);
  return (
    <View style={[styles.headerContainer, styleProp as any]}>
      <Text style={[styles.headerText, { color: text }]}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
