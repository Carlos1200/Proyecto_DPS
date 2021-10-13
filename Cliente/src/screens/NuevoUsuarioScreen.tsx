import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Btn } from "../components/Btn";
import Api from "../api/index";
import { UsuarioResponse } from "../interfaces";
import { AuthContext } from "../context/auth/AuthContext";

const { width } = Dimensions.get("window");
interface Props extends StackScreenProps<any, any> {}

interface NewUser {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
}

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  apellido: yup.string().required("El apellido es obligatorio"),
  correo: yup
    .string()
    .required("El correo es necesario")
    .email("El correo no es válido"),
  password: yup
    .string()
    .required("La contraseña es necesaria")
    .min(6, "Se requieren 6 caracteres mínimo"),
});

export const NuevoUsuarioScreen = ({ navigation }: Props) => {
  const {
    theme: {
      colors: { text, primary, background },
    },
  } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUser>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState(null);

  const onSubmit = async ({ nombre, apellido, correo, password }: NewUser) => {
    try {
      const { data } = await Api.post<UsuarioResponse>("/auth/usuarios", {
        nombre,
        apellido,
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
      <Header title='Nuevo Usuario' />
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
        <View style={styles.form}>
          <View style={{ marginTop: 30 }}>
            <Text style={[styles.label, { color: text }]}>Nombre</Text>
            <Input control={control} name='nombre' style={styles.input} />
            {errors.nombre && (
              <Text style={styles.error}>{errors.nombre.message}</Text>
            )}
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={[styles.label, { color: text }]}>Apellido</Text>
            <Input control={control} name='apellido' style={styles.input} />
            {errors.apellido && (
              <Text style={styles.error}>{errors.apellido.message}</Text>
            )}
          </View>
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
          <Btn title='Crear Cuenta' onpress={handleSubmit(onSubmit)} />
        </View>
        <View style={styles.info}>
          <Text style={{ color: text }}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ marginLeft: 15 }}
            onPress={() => navigation.replace("Login")}>
            <Text style={{ color: text }}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorForm: {
    flex: 1,
    borderTopLeftRadius: 100,
    alignItems: "center",
    marginTop: 20,
  },
  form: {
    width: width >= 1000 ? "50%" : "80%",
    marginTop: 20,
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
  error: {
    color: "red",
    borderLeftWidth: 2,
    borderLeftColor: "red",
    paddingLeft: 5,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 20,
  },
});
