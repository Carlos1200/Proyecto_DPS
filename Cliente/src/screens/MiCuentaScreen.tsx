import React, { useContext, useState } from "react";

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { ThemeContext } from "../context/theme/ThemeContext";

import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../context/auth/AuthContext";
import { Input } from "../components/Input";
import { Btn } from "../components/Btn";
import * as ImagePicker from "expo-image-picker";
import Api from "../api";
import { UsuarioResponse } from "../interfaces/index";

const { width } = Dimensions.get("window");
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

export const MiCuentaScreen = () => {
  const {
    theme: {
      colors: { text, background, primary },
      dark,
    },
  } = useContext(ThemeContext);

  const {
    auth: { nombre, apellido, foto, correo, _id },
    actualizarFoto,
    actualizarUsuario,
  } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewUser>({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre,
      apellido,
      correo,
    },
  });

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const file: any = {
        uri: result.uri,
        type: "image/jpeg",
        name: "Imagen Usuario",
      };

      const formData = new FormData();
      formData.append("archivo", file);
      try {
        const { data } = await Api.put(`/upload/usuario/${_id}`, formData);

        actualizarFoto(data.foto);
      } catch (error) {
        setError(error.response.data.msg);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    }
  };

  const submit = async ({ nombre, apellido, correo, password }: NewUser) => {
    try {
      const { data } = await Api.put<UsuarioResponse>(`/auth/usuarios/${_id}`, {
        nombre,
        apellido,
        correo,
        password,
      });
      actualizarUsuario(data.usuario);
    } catch (error) {
      setError(error.response.data.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <ScrollView>
      <View style={[styles.headerBox, { backgroundColor: primary }]}>
        {/* <Ionicons name='create' color={"#FFF"} style={styles.icons} /> */}
        <View style={styles.imageContainer}>
          <Image
            source={foto ? { uri: foto } : require("../assets/user.png")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.formBox}>
        <View style={styles.nameBox}>
          <Text style={[styles.titleName, { color: text }]}>{nombre}</Text>
          <Text style={[styles.titleName, { color: text }]}>{apellido}</Text>
        </View>
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
        <View>
          <Text style={[styles.label, { color: text }]}>Nombre</Text>
          <Input control={control} name='nombre' style={styles.input} />
          {errors.nombre && (
            <Text style={styles.error}>{errors.nombre.message}</Text>
          )}
        </View>
        <View>
          <Text style={[styles.label, { color: text }]}>Apellido</Text>
          <Input control={control} name='apellido' style={styles.input} />
          {errors.apellido && (
            <Text style={styles.error}>{errors.apellido.message}</Text>
          )}
        </View>
        <View>
          <Text style={[styles.label, { color: text }]}>Correo</Text>
          <Input control={control} name='correo' style={styles.input} />
          {errors.correo && (
            <Text style={styles.error}>{errors.correo.message}</Text>
          )}
        </View>
        <View>
          <Text style={[styles.label, { color: text }]}>Contraseña</Text>
          <Input control={control} name='password' style={styles.input} />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
        </View>
      </View>
      <View style={styles.buttonBox}>
        <Btn
          title='Cambiar Foto de Perfil'
          style={[styles.button]}
          onpress={pickImage}
        />
        <Btn
          title='Guardar Cambios'
          style={[styles.button]}
          onpress={handleSubmit(submit)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    display: "flex",
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 30,
    paddingRight: 10,
    fontWeight: "bold",
  },
  icons: {
    fontSize: 50,
    fontWeight: "bold",
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    width: width > 1000 ? "50%" : "90%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 80,
  },
  nameBox: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
  },
  titleName: {
    fontSize: 30,
    fontWeight: "bold",

    paddingHorizontal: 5,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    top: "50%",
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  input: {
    backgroundColor: "#EDEDED",
    paddingVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingLeft: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 22,
    paddingLeft: 25,
    paddingBottom: 5,
    marginTop: 10,
  },
  error: {
    color: "red",
    borderLeftWidth: 2,
    borderLeftColor: "red",
    paddingLeft: 5,
  },

  buttonBox: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    paddingVertical: 10,
    textAlign: "center",
    width: width > 1000 ? "40%" : "90%",
    alignSelf: "center",
    marginTop: 15,
  },
});
