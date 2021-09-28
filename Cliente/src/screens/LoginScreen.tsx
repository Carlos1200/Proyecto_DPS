import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Header } from "../components/Header";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Input } from "../components/Input";
import { Btn } from "../components/Btn";
import { StackScreenProps } from "@react-navigation/stack";
import Api from "../api/index";
import { AuthContext } from "../context/auth/AuthContext";
import { BtnGoogle } from "../components/BtnGoogle";

const { width } = Dimensions.get("window");

export interface IFormInputs {
  correo: string;
  password: string;
}

interface Props extends StackScreenProps<any, any> {}

const schema = yup.object().shape({
  correo: yup
    .string()
    .required("El correo es necesario")
    .email("El correo no es válido"),
  password: yup.string().required("La contraseña es necesaria"),
});

export const LoginScreen = ({ navigation }: Props) => {
  const {
    theme: {
      dark,
      colors: { text, primary, background },
    },
  } = useContext(ThemeContext);

  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ correo, password }: IFormInputs) => {
    try {
      const { data } = await Api.post("/auth/login", {
        correo,
        password,
      });
      login(data);
    } catch (error) {
      setError(error.response.data.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: primary }}>
      <View style={styles.contenedorLogo}>
        <Image
          style={[styles.logo, { backgroundColor: background }]}
          source={
            dark
              ? require("../assets/logoOscuro.png")
              : require("../assets/logoClaro.png")
          }
        />
      </View>
      <View style={[styles.contenedorForm, { backgroundColor: background }]}>
        {error && (
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 18,
              marginTop: 10,
            }}>
            {error}
          </Text>
        )}
        <Header title='Login' />
        <View style={styles.form}>
          <View style={{ marginTop: 30 }}>
            <Text style={[styles.label, { color: text }]}>Correo</Text>
            <Input control={control} name='correo' style={styles.input} />
            {errors.correo && (
              <Text style={styles.error}>{errors.correo.message}</Text>
            )}
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={[styles.label, { color: text }]}>Contraseña</Text>
            <Input control={control} name='password' style={styles.input} />
            {errors.password && (
              <Text style={styles.error}>{errors.password.message}</Text>
            )}
          </View>
          <Btn title='Ingresar' onpress={handleSubmit(onSubmit)} />
          <BtnGoogle color={primary} />
        </View>
        <View style={styles.info}>
          <Text style={{ color: text }}>¿No tienes cuenta?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ marginLeft: 15 }}
            onPress={() => navigation.replace("CrearCuenta")}>
            <Text style={{ color: text }}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorLogo: {
    alignItems: "center",
    marginVertical: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  contenedorForm: {
    flex: 1,
    borderTopLeftRadius: 100,
    alignItems: "center",
  },
  form: {
    width: width >= 1000 ? "50%" : "80%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#EDEDED",
    paddingVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  error: {
    color: "red",
    borderLeftWidth: 2,
    borderLeftColor: "red",
    paddingLeft: 5,
  },
});
