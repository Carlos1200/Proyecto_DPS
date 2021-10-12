import { Theme } from "@react-navigation/native";

type ThemeAction = { type: "set_light_theme" } | { type: "set_dark_theme" };

export interface ThemeState extends Theme {
  currentTheme: "light" | "dark";
  secondary: string;
}

export const lightTheme: ThemeState = {
  currentTheme: "light",
  dark: false,
  secondary: "#5A6978",
  colors: {
    primary: "#A576E6",
    background: "#F3F3F3",
    card: "#343F4B",
    text: "#47525E",
    border: "black",
    notification: "teal",
  },
};
export const darkTheme: ThemeState = {
  currentTheme: "dark",
  dark: true,
  secondary: "#5A6978",
  colors: {
    primary: "#A576E6",
    background: "#232A32",
    card: "#343F4B",
    text: "white",
    border: "white",
    notification: "teal",
  },
};

export const themeReducer = (
  state: ThemeState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case "set_light_theme":
      return { ...lightTheme };
    case "set_dark_theme": {
      return { ...darkTheme };
    }
    default:
      return state;
  }
};
