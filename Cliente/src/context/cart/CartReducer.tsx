import { Producto } from "../../interfaces/index";
type CartAction =
  | { type: "AgregarProducto"; payload: ProductCart }
  | { type: "EliminarProducto"; payload: ProductCart[] }
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
        productos: [...state.productos, action.payload],
        total: state.total,
      };
    case "EliminarProducto":
      return {
        ...state,
        productos: action.payload,
        total: state.total,
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
