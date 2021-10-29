import React, { createContext, useEffect, useReducer, useState } from "react";
import Api from "../../api";
import { Producto, ProductosResponse } from "../../interfaces/index";
import { ProcuctReducer, ProductoState } from "./ProductReducer";

interface ProductContextProps {
  productos: Producto[];
  misProductos: Producto[];
  ActualizarProductos: (producto: Producto) => void;
  AgregarMisProductos: (productosMios: Producto[]) => void;
}

export const ProductContext = createContext({} as ProductContextProps);

const initialState: ProductoState = {
  productos: [],
  misProductos: [],
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProcuctReducer, initialState);

  useEffect(() => {
    ObtenerProductos();
  }, []);

  const ObtenerProductos = async () => {
    const { data } = await Api.get<ProductosResponse>("/producto");

    dispatch({
      type: "AgregarProductos",
      payload: data.productos,
    });
  };

  const ActualizarProductos = (producto: Producto) => {
    const indiceProduct = state.productos.findIndex((elemento) => {
      if (elemento._id === producto._id) {
        return true;
      }
    });

    const indiceProductMine = state.misProductos.findIndex((elemento) => {
      if (elemento._id === producto._id) {
        return true;
      }
    });

    if (indiceProduct >= 0) {
      state.productos[indiceProduct] = producto;
      state.misProductos[indiceProductMine] = producto;
      dispatch({
        type: "AgregarProductos",
        payload: state.productos,
      });
      dispatch({
        type: "AgregarMisProductos",
        payload: state.misProductos,
      });
    } else {
      const nuevosProductos = [...state.productos, producto];
      dispatch({
        type: "AgregarProductos",
        payload: nuevosProductos,
      });
    }
  };

  const AgregarMisProductos = (productosMios: Producto[]) => {
    dispatch({
      type: "AgregarMisProductos",
      payload: productosMios,
    });
  };

  return (
    <ProductContext.Provider
      value={{
        productos: state.productos,
        misProductos: state.misProductos,
        ActualizarProductos,
        AgregarMisProductos,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
