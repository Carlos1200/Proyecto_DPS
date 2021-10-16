import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { StackScreenProps } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { ThemeContext } from "../context/theme/ThemeContext";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Btn } from "../components/Btn";
import Api from "../api/index";
import { Producto } from "../interfaces";
import { AuthContext } from "../context/auth/AuthContext";
import { ProductContext } from "../context/product/ProductContext";

const { width } = Dimensions.get("window");
interface Props extends StackScreenProps<any, any> {}

interface NewProduct {
  producto: string;
  year: string;
  informacion: string;
  precio: number;
  existencia: number;
  foto: string;
}

const schema = yup.object().shape({
  producto: yup
    .string()
    .required("El nombre es requerido")
    .min(1, "Nombre no válido"),
  informacion: yup
    .string()
    .required("La información es requerida")
    .min(1, "Información no válida"),
  year: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("El año es requerido")
    .integer("Año no válido"),
  precio: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("El precio es requerido"),
  existencia: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("El precio es requerido")
    .integer("Cantidad no válida"),
  foto: yup.string().required("La foto es requerida").min(1, "Campo no válido"),
});

export const NuevoProductoScreen = ({ navigation }: Props) => {
  const {
    theme: {
      colors: { text, primary, background },
    },
  } = useContext(ThemeContext);

  const {
    auth: { _id },
  } = useContext(AuthContext);

  const { ActualizarProductos } = useContext(ProductContext);

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewProduct>({
    resolver: yupResolver(schema),
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
        name: "Imagen 1",
      };

      const formData = new FormData();
      formData.append("archivo", file);
      try {
        const { data } = await Api.post("/upload", formData);
        setValue("foto", data.url);
        setImage(data.url);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const [error, setError] = useState(null);

  const onSubmit = async ({
    producto,
    informacion,
    year,
    precio,
    existencia,
    foto,
  }: NewProduct) => {
    try {
      const { data } = await Api.post("/producto", {
        nombre: producto,
        informacion,
        year,
        precio,
        foto,
        existencia,
        creador: _id,
      });
      ActualizarProductos(data.producto);
      reset({
        producto: "",
        year: "",
        informacion: "",
        precio: null,
        existencia: null,
        foto: "",
      });

      navigation.navigate("Inicio");
    } catch (error) {
      setError(error.response.data.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: primary }}>
        <Header title='Nuevo Producto' />
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
              <Input control={control} name='producto' style={styles.input} />
              {errors.producto && (
                <Text style={styles.error}>{errors.producto.message}</Text>
              )}
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={[styles.label, { color: text }]}>Información</Text>
              <Input
                control={control}
                name='informacion'
                style={[styles.input, { height: 90 }]}
              />
              {errors.informacion && (
                <Text style={styles.error}>{errors.informacion.message}</Text>
              )}
            </View>
            <View style={styles.inputgroup}>
              <View style={{ marginTop: 30, width: "30%", marginRight: "5%" }}>
                <Text style={[styles.label, { color: text }]}>Año</Text>
                <Input control={control} name='year' style={styles.input} />
                {errors.year && (
                  <Text style={styles.error}>{errors.year.message}</Text>
                )}
              </View>
              <View style={{ marginTop: 30, width: "30%", marginRight: "5%" }}>
                <Text style={[styles.label, { color: text }]}>Precio</Text>
                <Input control={control} name='precio' style={styles.input} />
                {errors.precio && (
                  <Text style={styles.error}>{errors.precio.message}</Text>
                )}
              </View>
              <View style={{ marginTop: 30, width: "30%" }}>
                <Text style={[styles.label, { color: text }]}>Cantidad</Text>
                <Input
                  control={control}
                  name='existencia'
                  style={styles.input}
                />
                {errors.existencia && (
                  <Text style={styles.error}>{errors.existencia.message}</Text>
                )}
              </View>
            </View>
            <View>
              <Btn title='Subir Foto' onpress={pickImage} />
              {errors.foto && (
                <Text style={styles.error}>{errors.foto.message}</Text>
              )}
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, alignSelf: "center" }}
                />
              )}
            </View>

            <Btn title='Agregar producto' onpress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputgroup: {
    display: "flex",
    flexDirection: "row",
  },
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
