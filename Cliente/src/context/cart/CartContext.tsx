import React, { createContext, useReducer } from "react";
import { CartReducer, CartState, ProductCart } from "./CartReducer";

interface CartContextProps {
  productos: ProductCart[];
  total: number;
  agregarProducto: (producto: ProductCart) => void;
  eliminarProducto: (id: string) => void;
  reiniciarCarrito: () => void;
}

export const CartContext = createContext({} as CartContextProps);

const initialState: CartState = {
  productos: [],
  total: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const agregarProducto = (producto: ProductCart) => {
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

  const reiniciarCarrito = () => {
    dispatch({
      type: "ReiniciarCarrito",
    });
  };

  return (
    <CartContext.Provider
      value={{
        productos: state.productos,
        total: state.total,
        agregarProducto,
        eliminarProducto,
        reiniciarCarrito,
      }}>
      {children}
    </CartContext.Provider>
  );
};
