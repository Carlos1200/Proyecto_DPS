import { Producto } from "../../interfaces/index";
type CartAction =
  | {
      type: "AgregarProducto";
      payload: { producto: ProductCart[]; total: number };
    }
  | {
      type: "EliminarProducto";
      payload: { productos: ProductCart[]; total: number };
    }
  | { type: "ReiniciarCarrito" };

export interface ProductCart extends Producto {
  cantidad: number;
}

export interface CartState {
  productos: ProductCart[];
  total: number;
}

export const CartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case "AgregarProducto":
      return {
        ...state,
        productos: action.payload.producto,
        total: action.payload.total,
      };
    case "EliminarProducto":
      return {
        ...state,
        productos: action.payload.productos,
        total: action.payload.total,
      };
    case "ReiniciarCarrito":
      return {
        ...state,
        productos: [],
        total: 0,
      };
    default:
      return state;
  }
};
