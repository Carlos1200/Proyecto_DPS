import { Usuario } from "../../interfaces/index";
type AuthAction =
  | { type: "Login"; payload: Usuario }
  | { type: "Actualizar"; payload: Usuario }
  | { type: "ActualizarFoto"; payload: string }
  | { type: "notAuthenticated" }
  | { type: "logOut" };

export interface AuthState extends Usuario {
  status: "checking" | "authenticated" | "not-authenticated";
}

export const AuthReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "Actualizar":
    case "Login":
      const { _id, nombre, apellido, correo, foto } = action.payload;

      return {
        ...state,
        _id,
        nombre,
        apellido,
        correo,
        foto,
        status: "authenticated",
      };
    case "ActualizarFoto":
      return {
        ...state,
        foto: action.payload,
      };
    case "notAuthenticated":
    case "logOut":
      return {
        ...state,
        status: "not-authenticated",
        _id: null,
        nombre: null,
        apellido: null,
        correo: null,
        foto: null,
      };
    default:
      return state;
  }
};
