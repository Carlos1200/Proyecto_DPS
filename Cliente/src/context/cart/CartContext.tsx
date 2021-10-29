import React, { createContext, useReducer } from "react";
import { CartReducer, CartState } from "./CartReducer";
import { Producto } from "../../interfaces/index";

interface CartContextProps {
  productos: Producto[];
  total: number;
  agregarProducto: (producto: Producto) => void;
  eliminarProducto: (id: string) => void;
}

export const CartContext = createContext({} as CartContextProps);

const initialState: CartState = {
  productos: [],
  total: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const agregarProducto = (producto: Producto) => {
    dispatch({
      type: "AgregarProducto",
      payload: producto,
    });
  };

  const eliminarProducto = (id: string) => {
    const nuevosProductos = state.productos.filter(
      (producto) => producto._id !== id
    );

    dispatch({
      type: "EliminarProducto",
      payload: nuevosProductos,
    });
  };

  return (
    <CartContext.Provider
      value={{
        productos: state.productos,
        total: state.total,
        agregarProducto,
        eliminarProducto,
      }}>
      {children}
    </CartContext.Provider>
  );
};
