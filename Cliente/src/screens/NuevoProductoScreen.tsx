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
import { ProductosResponse } from "../interfaces";
import { AuthContext } from "../context/auth/AuthContext";

const { width } = Dimensions.get("window");
interface Props extends StackScreenProps<any, any> {}

interface NewProduct {
  producto: string;
  year: string;
  precio: number;
  creador: string;
  existencia: number;
  foto: string;
}

const schema = yup.object().shape({
  producto: yup.string().required("El nombre es requerido").min(1, "Nombre no válido"),
  year: yup.number().transform(value =>
    isNaN(value) ? undefined : value
  ).required("El año es requerido").integer("Año no válido"),
  precio: yup
    .number().transform(value =>
      isNaN(value) ? undefined : value
    ).required("El precio es requerido"),
  creador: yup
    .string()
    .required("El creador es requerido").min(1, "Nombre no válido"),
  existencia: yup.number().transform(value =>
    isNaN(value) ? undefined : value
  ).required("El precio es requerido").integer("Cantidad no válida"),
  foto: yup.string().required("La foto es requerida").min(1, "Campo no válido")
});

export const NuevoProductoScreen = ({ navigation }: Props) => {
  const {
    theme: {
      colors: { text, primary, background },
    },
  } = useContext(ThemeContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProduct>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState(null);

  const onSubmit = async ({ producto, year, precio, creador, existencia, foto }: NewProduct) => {
    try {
      const { data } = await Api.post<ProductosResponse>('/producto', {
        producto,
        year,
        precio,
        creador,
        existencia,
        foto,
      });
      
    } catch (error) {
      setError(error.response.data.msg);
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };
  return (
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
          <View style={styles.inputgroup}>
            <View style={{ marginTop: 30, width:'30%', marginRight:'5%' }}>
              <Text style={[styles.label, { color: text }]}>Año</Text>
              <Input control={control} name='year' style={styles.input} />
              {errors.year && (
                <Text style={styles.error}>{errors.year.message}</Text>
              )}
            </View>
            <View style={{ marginTop: 30, width:'30%', marginRight:'5%' }}>
              <Text style={[styles.label, { color: text }]}>Precio</Text>
              <Input control={control} name='precio' style={styles.input} />
              {errors.precio && (
                <Text style={styles.error}>{errors.precio.message}</Text>
              )}
            </View>
            <View style={{ marginTop: 30, width:'30%' }}>
              <Text style={[styles.label, { color: text }]}>Cantidad</Text>
              <Input control={control} name='existencia' style={styles.input} />
              {errors.existencia && (
                <Text style={styles.error}>{errors.existencia.message}</Text>
              )}
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={[styles.label, { color: text }]}>Creador</Text>
            <Input control={control} name='creador' style={styles.input} />
            {errors.creador && (
              <Text style={styles.error}>{errors.creador.message}</Text>
            )}
          </View>
          
          <View style={{ marginTop: 30 }}>
            <Text style={[styles.label, { color: text }]}>Foto</Text>
            <Input control={control} name='foto' style={styles.input} />
            {errors.foto && (
              <Text style={styles.error}>{errors.foto.message}</Text>
            )}
          </View>
          <Btn title='Agregar producto' onpress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </View>
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
