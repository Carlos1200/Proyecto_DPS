import { Producto } from "../../interfaces/index";
type ProductosAction =
  | { type: "AgregarProductos"; payload: Producto[] }
  | { type: "AgregarMisProductos"; payload: Producto[] };

export interface ProductoState {
  productos: Producto[];
  misProductos: Producto[];
}

export const ProcuctReducer = (
  state: ProductoState,
  action: ProductosAction
): ProductoState => {
  switch (action.type) {
    case "AgregarProductos":
      return {
        ...state,
        productos: action.payload,
      };
    case "AgregarMisProductos":
      return {
        ...state,
        misProductos: action.payload,
      };
    default:
      return state;
  }
};
