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
    let produtosArray = [];
    const nuevoProducto = state.productos.find(
      (prod) => prod._id === producto._id
    );
    if (nuevoProducto) {
      produtosArray = state.productos.map((prod) =>
        prod._id === producto._id
          ? { ...prod, cantidad: prod.cantidad + producto.cantidad }
          : prod
      );
    } else {
      produtosArray = [...state.productos, producto];
    }

    const total = produtosArray.reduce((acumulador, producto) => {
      return acumulador + producto.precio * producto.cantidad;
    }, 0);

    dispatch({
      type: "AgregarProducto",
      payload: {
        producto: produtosArray,
        total,
      },
    });
  };

  const eliminarProducto = (id: string) => {
    const nuevosProductos = state.productos.filter(
      (producto) => producto._id !== id
    );

    const total = nuevosProductos.reduce((acumulador, producto) => {
      return acumulador + producto.precio * producto.cantidad;
    }, 0);

    dispatch({
      type: "EliminarProducto",
      payload: {
        productos: nuevosProductos,
        total,
      },
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
