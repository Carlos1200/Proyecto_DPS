import React from "react";
import {
  Control,
  Controller,
  DeepMap,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { TextInput, Text, StyleProp, ViewStyle } from "react-native";

interface Props {
  control: Control<any, object>;

  name:
    | "correo"
    | "password"
    | "nombre"
    | "apellido"
    | "producto"
    | "informacion"
    | "year"
    | "precio"
    | "existencia";

  style?: StyleProp<ViewStyle>;
}

export const Input = ({ control, name, style }: Props) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={style}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          multiline={name === "informacion" ? true : false}
          secureTextEntry={name === "password" ? true : false}
          keyboardType={
            name === "correo"
              ? "email-address"
              : name === "year" || name === "precio" || name === "existencia"
              ? "numeric"
              : "default"
          }
        />
      )}
      name={name}
    />
  );
};
