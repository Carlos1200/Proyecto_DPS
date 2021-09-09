import React, { createContext, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario, UsuarioResponse } from "../../interfaces/index";
import { AuthReducer, AuthState } from "./AuthReducer";
import Api from "../../api/index";

interface AuthContextProps {
  auth: AuthState;
  login: ({ usuario, token }: UsuarioResponse) => Promise<void>;
  autenticar: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

const initialState: AuthState = {
  _id: null,
  nombre: null,
  apellido: null,
  correo: null,
  status: "checking",
};

export const AuthProvider = ({ children }: any) => {
  const [auth, dispatch] = useReducer(AuthReducer, initialState);

  const login = async ({ usuario, token }: UsuarioResponse) => {
    //Guardando token en LocalStorage
    await AsyncStorage.setItem("token", token);

    dispatch({
      type: "Login",
      payload: usuario,
    });
  };

  const autenticar = async () => {
    try {
      const { data } = await Api.get<Usuario>("/auth");
      dispatch({
        type: "Login",
        payload: data,
      });
    } catch (error) {
      dispatch({ type: "notAuthenticated" });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        autenticar,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
