import { Pedido } from "../../interfaces";
type OrderAction =
  | {
      type: "Agregar Pedidos";
      payload: Pedido[];
    }
  | {
      type: "Agregar Mis Pedido";
      payload: Pedido[];
    };

export interface OrderState {
  pedidos: Pedido[];
  misPedidos: Pedido[];
}

export const OrderReducer = (
  state: OrderState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case "Agregar Pedidos":
      return {
        ...state,
        pedidos: action.payload,
      };
    case "Agregar Mis Pedido":
      return {
        ...state,
        misPedidos: action.payload,
      };
    default:
      return state;
  }
};
