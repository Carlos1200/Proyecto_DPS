import React, { createContext, useReducer, useEffect } from "react";
import { Pedido, PedidosResponse } from "../../interfaces/index";
import { OrderReducer, OrderState } from "./OrderReducer";
import Api from "../../api/index";

interface OrderContextProps {
  pedidos: Pedido[];
  misPedidos: Pedido[];
  eliminarPedido: (id: string) => Promise<void>;
}

export const OrderContext = createContext({} as OrderContextProps);

export const initialState: OrderState = {
  pedidos: [],
  misPedidos: [],
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  useEffect(() => {
    obtenerPedidos();
  }, []);

  useEffect(() => {
    obtenerMisPedidos();
  }, []);

  const obtenerPedidos = async () => {
    try {
      const { data } = await Api.get<PedidosResponse>("/pedidos");
      dispatch({
        type: "Agregar Pedidos",
        payload: data.pedidos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerMisPedidos = async () => {
    try {
      const { data } = await Api.get<PedidosResponse>("/pedidos/vendedor");
      dispatch({
        type: "Agregar Mis Pedido",
        payload: data.pedidos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPedido = async (id: string) => {
    const arrayPedidos = state.pedidos.filter((pedido) => pedido._id !== id);
    try {
      await Api.delete(`/pedidos/${id}`);

      dispatch({
        type: "Agregar Pedidos",
        payload: arrayPedidos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        pedidos: state.pedidos,
        misPedidos: state.misPedidos,
        eliminarPedido,
      }}>
      {children}
    </OrderContext.Provider>
  );
};
