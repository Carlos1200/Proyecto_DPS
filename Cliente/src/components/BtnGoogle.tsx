import React, { useContext, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-google-app-auth";
import Api from "../api/index";
import { AuthContext } from "../context/auth/AuthContext";
import { UsuarioResponse } from "../interfaces/index";

interface Props {
  color: string;
}

export const BtnGoogle = ({ color }: Props) => {
  const { login } = useContext(AuthContext);

  useEffect(() => {
    return () => {};
  }, []);

  const handleGoogle = async () => {
    const config = {
      iosClientId: `366734103326-0ak62iulih5cjk9gvdvethihff59p163.apps.googleusercontent.com`,
      androidClientId: `366734103326-53h41ioidevplijsqih5uol0btn7vfpr.apps.googleusercontent.com`,
      scopes: ["profile", "email"],
    };

    try {
      const { idToken, type }: any = await Google.logInAsync(config);

      if (type === "success") {
        const { data } = await Api.post<UsuarioResponse>("/auth/loginGoogle", {
          idToken,
        });
        login(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={handleGoogle}
      activeOpacity={0.8}>
      <Ionicons name='logo-google' color={color} style={styles.icon} />
      <Text style={styles.text}>Ingresar</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
