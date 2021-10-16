import React, { createContext, useEffect, useReducer, useState } from "react";
import Api from "../../api";
import { Producto, ProductosResponse } from "../../interfaces/index";

interface ProductContextProps {
  productos: Producto[];
  ActualizarProductos: (producto: Producto) => void;
}

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>();

  useEffect(() => {
    ObtenerProductos();
  }, []);

  const ObtenerProductos = async () => {
    const { data } = await Api.get<ProductosResponse>("/producto");
    setProductos(data.productos);
  };

  const ActualizarProductos = (producto: Producto) => {
    console.log(producto);

    const nuevosProductos = [...productos, producto];
    setProductos(nuevosProductos);
  };

  return (
    <ProductContext.Provider
      value={{
        productos,
        ActualizarProductos,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
