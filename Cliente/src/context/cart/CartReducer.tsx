import { Producto } from "../../interfaces/index";
type CartAction =
  | { type: "AgregarProducto"; payload: Producto }
  | { type: "EliminarProducto"; payload: Producto[] };

export interface CartState {
  productos: Producto[];
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
      };
    case "EliminarProducto":
      return {
        ...state,
        productos: action.payload,
      };
    default:
      return state;
  }
};
