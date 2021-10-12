import React, { useContext } from "react";
import { Image, View } from "react-native";
import { ThemeContext } from "../context/theme/ThemeContext";

export const LoadingApp = () => {
  const {
    theme: {
      colors: { background },
      dark,
    },
  } = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Image
        style={{ width: 200, height: 200 }}
        source={
          dark
            ? require("../assets/logoOscuro.png")
            : require("../assets/logoClaro.png")
        }
      />
    </View>
  );
};
